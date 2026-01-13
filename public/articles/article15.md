# go-delta: A Modern Approach to Compression with Content-Defined Chunking

## Introduction

Backing up large directories with frequently changing files presents a classic problem: traditional compression tools re-compress everything, even when only a small portion of data has changed. **go-delta** solves this with content-defined chunking and deduplication, built entirely in Go with Zstandard compression.

GitHub: [go-delta](https://github.com/creativeyann17/go-delta)

## What Makes go-delta Different

Most compression tools treat files as monolithic blobs. go-delta takes a smarter approach:

1. **Content-Defined Chunking (FastCDC)** - Instead of fixed-size blocks, chunk boundaries are determined by the content itself using rolling hashes. This means inserting a single byte at the beginning of a file doesn't invalidate every chunk - 95% of chunks remain identical versus 0% with fixed-size chunking.

2. **BLAKE3 Hashing** - Each chunk gets a cryptographic fingerprint. Identical chunks are stored once, regardless of which file they came from.

3. **True Parallelism** - Rather than fighting mutex contention, go-delta uses folder-based worker pools. Each thread processes complete directories independently.

## Three Archive Formats

go-delta offers flexibility based on your needs:

| Format | Best For | Compression |
|--------|----------|-------------|
| **ZIP** | Portability, standard tooling | Deflate (1-9) |
| **GDELTA01** | Speed, best ratio | Zstd (1-22) |
| **GDELTA02** | Incremental backups, deduplication | Zstd + FastCDC |

## Quick Start

```bash
# Install
git clone https://github.com/creativeyann17/go-delta.git
cd go-delta && make build

# Compress with deduplication
./bin/godelta compress -i /data -o backup.delta --chunk-size 64KB

# Decompress
./bin/godelta decompress -i backup.delta -o /restore --overwrite
```

## Real-World Use Case

Consider a directory with log files that rotate daily. With traditional compression, yesterday's backup shares nothing with today's. With go-delta's GDELTA02 format:

- Unchanged portions are deduplicated automatically
- Only new/modified chunks consume storage
- Memory stays bounded via LRU eviction on the chunk store

## Key CLI Options

```bash
godelta compress \
  --input /path/to/data \
  --output archive.delta \
  --threads 8 \              # Parallel workers (default: CPU count)
  --level 5 \                # Compression level 1-22
  --chunk-size 64KB \        # Enable dedup with this avg chunk size
  --chunk-store-size 2GB \   # Max memory for dedup cache
  --thread-memory 0          # Auto-calculate per-thread memory
```

## As a Library

go-delta works as both CLI and Go package:

```go
import "github.com/creativeyann17/go-delta/pkg/compress"

opts := &compress.Options{
    InputPath:  "/data",
    OutputPath: "backup.delta",
    MaxThreads: 4,
    Level:      5,
}
result, err := compress.Compress(opts, progressCallback)
```

## Technical Decisions Worth Noting

- **4KB minimum chunk size** prevents metadata overhead from exceeding compression gains
- **Streaming architecture** avoids loading compressed data into RAM
- **Automatic cleanup** handles temp files on exit, errors, and SIGINT
- **Human-readable sizes** throughout (`64KB`, `2GB`) instead of raw bytes

## Conclusion

go-delta fills a gap between simple compression tools and complex backup systems. If you need fast, deduplicated archives without external dependencies, it's worth a look. Pure Go, MIT licensed, and designed for production use.
