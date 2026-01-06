# Introduction

Today I built a Go web framework postgres + migration project with Claude Code to compare implementation of 7 popular Go HTTP frameworks. The goal was to implement the same simple "Hello World" API across all frameworks and measure their response times then having one with CRUD handler that manage Cities in a database.

## The Frameworks

I chose to implement and benchmark these frameworks:

- **Fiber** - Express-inspired, built on top of FastHTTP
- **Gin** - High-performance HTTP web framework with a Martini-like API
- **Echo** - High performance, minimalist Go web framework
- **Chi** - Lightweight, idiomatic router for building Go HTTP services
- **HttpRouter** - High-performance HTTP request router with minimal overhead
- **Hertz** - CloudWeGo's high-performance HTTP framework from ByteDance
- **FastHTTP** - Fast HTTP implementation for Go (lower-level than other frameworks)

## Project Structure

The project follows Go best practices with a clean separation of concerns:

```
GolangAPIsTest/
├── cmd/                    # Executable entry points (package main)
│   ├── fiber/main.go
│   ├── gin/main.go
│   └── ...
├── internal/               # Shared server logic with Start/Stop
├── database/               # Databases (postgres)
├── repository/             # Tables (city)
├── types/                  # REST and DOA structs + mappers from one to another
├── migrations/             # SQL migration scripts  
functions
│   ├── fiber/server.go
│   ├── gin/server.go
│   └── ...
└── benchmark/              # Benchmark tests
    └── benchmark_test.go
```

Each framework has two files:
- `cmd/*/main.go` - The executable entry point
- `internal/*/server.go` - The server implementation with `Start()` and `Stop()` functions

This design eliminates code duplication - the benchmark tests import from `internal/` to reuse the same server logic.

## The Benchmark

Each framework exposes a `/hello` endpoint that returns:

```json
{
  "message": "Hello, World!",
  "framework": "FrameworkName"
}
```

The benchmark performs:
- 100 warmup requests
- 1,000 benchmark requests
- Measures mean, min, and max response times

## Results

```
================================================================================
BENCHMARK SUMMARY
================================================================================
Framework       | Mean Time    | Min Time     | Max Time     | Success Rate
--------------------------------------------------------------------------------
Fiber           | 30µs         | 18µs         | 249µs        | 100.00%
Gin             | 32µs         | 22µs         | 312µs        | 100.00%
Echo            | 34µs         | 22µs         | 383µs        | 100.00%
Chi             | 31µs         | 22µs         | 337µs        | 100.00%
HttpRouter      | 32µs         | 22µs         | 279µs        | 100.00%
Hertz           | 32µs         | 24µs         | 266µs        | 100.00%
FastHTTP        | 26µs         | 16µs         | 231µs        | 100.00%
================================================================================
```

**Key findings:**
1. **FastHTTP** is the fastest (as expected - it's the low-level implementation)
2. **Fiber** comes second, leveraging FastHTTP under the hood
3. All other frameworks perform very similarly (31-34µs mean)
4. 100% success rate across all frameworks

## A Word of Caution

These benchmarks, while fun to look at, aren't particularly realistic. A simple `/hello` endpoint doesn't reflect real-world scenarios where you'd have:
- Database queries
- JSON serialization of complex objects
- Middleware (auth, logging, CORS)
- Request validation
- Business logic

The performance differences become negligible once you add actual workload. That said, having all these implementations side by side is valuable for:
- Learning each framework's API style
- Quick reference for routing patterns
- Understanding the ecosystem

## Quick Start

```bash
# Run benchmarks
make bench

# Run individual servers on :8080
make fiber
make gin
make echo
# ... etc
```

## Database

Fiber been choosen to write a CRUD set of handlers for City table.
The library used is `pgx` for the low level simplicity and a migration lirary that will up/down SQL files on the start for production ready `goose`

## Conclusion

All 7 frameworks are production-ready and performant. Your choice should be based on:
- **API design preference** (Express-like vs idiomatic Go)
- **Ecosystem** (middleware, documentation, community)
- **Project requirements** (do you need net/http compatibility?)

If raw speed is your priority and you're okay with a different API: FastHTTP or Fiber.
If you prefer net/http compatibility: Chi, Gin, Echo, or HttpRouter.
If you want something from ByteDance's ecosystem: Hertz.

The code is available at [github.com/creativeyann17/GolangAPIsTest](https://github.com/creativeyann17/GolangAPIsTest)
