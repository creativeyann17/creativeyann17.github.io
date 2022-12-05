# Introduction

Hello! Today we are building another secret-santa CLI! Yes we already had the **scala** implementation but today we will be working on something really special ... a **GO** implementation with the help of **ChatGPT**. 

## Why GO ?

This year I have learned **GO** for professional purpose but didn't used it a lot, this little secret-santa will be a good practice in my opinion.

## ChatGPT

My Twitter feed has been flooded with this all over the weekend and for having heard of **copilot** I thought: "ok, yes, another so called AI tools". But after few minutes looking at the examples peoples were publishing it was becoming more and more obvious that ... this is crazy powerful and not only for programmers but for lot of professions.

## AI Tools

As a software developer I don't use a lot of tools other than my IDEs which to be fair contain already most of the features we need. Other tools will be of course: **google + stack-overflow** for any documentation and bugs search.

I still regret not having used **Github Copilot** yet, there is a free trial and the integration with **VSCode** looks easy to setup, so why ? I think that so far I have the capabilities to write my own code and functions without relying on a *code generator* and spend more time with the tools itself than the code I want to write instead.

AI Tools have become really powerful, they are no more fiction and it's time to use them because they will, in my opinion, be the new tool in the toolbox of soft. dev. and not using them will be a massive drawback compared to people that do use them.

## Secret-Santa CLI

Once again after having done one in scala: [secret-santa CLI in Scala](https://creativeyann17.github.io/#/article/minimal-secret-santa) lets build a secret-santa CLI but this time in **GO** and most important ... we will ask **ChatGPT** to guide us along the process.

### Do you know ?

![Image](articles/images/article11_1.jpg 'Image')

### Foundation of the program

We will ask **ChatGPT** to write the code step by step.

![Image](articles/images/article11_2.jpg 'Image')

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	// Create a list of names
	names := []string{"Alice", "Bob", "Carol", "Dave", "Eve"}

	// Initialize the random number generator
	rand.Seed(time.Now().UnixNano())

	// Shuffle the names
	for i := range names {
		j := rand.Intn(i + 1)
		names[i], names[j] = names[j], names[i]
	}

	// Print the name pairs
	for i := 0; i < len(names)-1; i++ {
		fmt.Printf("%s gives a gift to %s\n", names[i], names[i+1])
	}
	// The last person gives a gift to the first person
	fmt.Printf("%s gives a gift to %s\n", names[len(names)-1], names[0])
}
```
In a few seconds we already have a functional program! That's crazy ... and the code itself looks good! 

I leaned this syntax `names[i], names[j] = names[j], names[i]` never seen that before.

The way the program *shuffle* the names to build some sort of linked array where every name will give to name + 1 is probably better than my own implementation in scala where I used a list of remaining people to give and it creates a **continuous chain between people** and not some block of people giving to each other ... really really good!

Executing the code works perfectly `go run main.go`:

```
Bob gives a gift to Dave
Dave gives a gift to Eve
Eve gives a gift to Alice
Alice gives a gift to Carol
Carol gives a gift to Bob
```

### Extract the names from TSV

Having hardcoded names isn't hat optimal, let's see how **ChatGPT** will handle a TSV file.

![Image](articles/images/article11_3.jpg 'Image')

```go
package main

import (
    "bufio"
    "fmt"
    "math/rand"
    "os"
    "strings"
    "time"
)

func main() {
    // Open the TSV file
    file, err := os.Open("names.TSV")
    if err != nil {
        panic(err)
    }
    defer file.Close()

    // Create a new scanner to read the file
    scanner := bufio.NewScanner(file)

    // Create a list of names
    var names []string

    // Read the names from the file
    for scanner.Scan() {
        // Split the line on the tab character
        fields := strings.Split(scanner.Text(), "\t")
        // Append the first field to the list of names
        names = append(names, fields[0])
    }

    // Initialize the random number generator
    rand.Seed(time.Now().UnixNano())

    // Shuffle the names
    for i := range names {
        j := rand.Intn(i + 1)
        names[i], names[j] = names[j], names[i]
    }

    // Print the name pairs
    for i := 0; i < len(names)-1; i++ {
        fmt.Printf("%s gives a gift to %s\n", names[i], names[i+1])
    }
    // The last person gives a gift to the first person
    fmt.Printf("%s gives a gift to %s\n", names[len(names)-1], names[0])
}
```
- The TSV extraction is done without additional library OK why not
- I would complain about the lack of robustness if the first column is empty or missing but OK

Once again executing the code work just fine, don't forget to create a *names.TSV* file.

### TSV file name as a CLI param

Once again hardcoded elements are not what we want. Let's see how **ChatGPT** handle the TSV file name as an argument of the program.

![Image](articles/images/article11_4.jpg 'Image')

```go
package main

import (
    "bufio"
    "fmt"
    "math/rand"
    "os"
    "strings"
    "time"
)

func main() {
    // Check that a file name was provided
    if len(os.Args) < 2 {
        fmt.Println("Usage: secret-santa [file]")
        return
    }

    // Open the TSV file
    file, err := os.Open(os.Args[1])
    if err != nil {
        panic(err)
    }
    defer file.Close()

    // Create a new scanner to read the file
    scanner := bufio.NewScanner(file)

    // Create a list of names
    var names []string

    // Read the names from the file
    for scanner.Scan() {
        // Split the line on the tab character
        fields := strings.Split(scanner.Text(), "\t")
        // Append the first field to the list of names
        names = append(names, fields[0])
    }

    // Initialize the random number generator
    rand.Seed(time.Now().UnixNano())

    // Shuffle the names
    for i := range names {
        j := rand.Intn(i + 1)
        names[i], names[j] = names[j], names[i]
    }

    // Print the name pairs
    for i := 0; i < len(names)-1; i++ {
        fmt.Printf("%s gives a gift to %s\n", names[i], names[i+1])
    }
    // The last person gives a gift to the first person
    fmt.Printf("%s gives a gift to %s\n", names[len(names)-1], names[0])
}
```
I was expected the response to use **flag** which is common for command line in **GO** and probably in case of more params and better display of usage we could ask again to use a CLI library instead of parsing ourself the args. But the result is OK and this time we have a condition to handle robustness if missing param.

### Exclusion list

One feature we also need is a list of participants that can't give a gift to each other. The solution in Scala was to add a second column to the input file and put the names here, lets ask the same logic to **ChatGPT**.

![Image](articles/images/article11_5.jpg 'Image')

```go
package main

import (
	"bufio"
	"fmt"
	"math/rand"
	"os"
	"strings"
	"time"
)

func main() {
	// Check that a file name was provided
	if len(os.Args) < 2 {
		fmt.Println("Usage: secret-santa [file]")
		return
	}

	// Open the TSV file
	file, err := os.Open(os.Args[1])
	if err != nil {
		panic(err)
	}
	defer file.Close()

	// Create a new scanner to read the file
	scanner := bufio.NewScanner(file)

	// Create a list of names
	var names []string
	// Create a map of exclusions
	exclusions := make(map[string]string)

	// Read the names and exclusions from the file
	for scanner.Scan() {
		// Split the line on the tab character
		fields := strings.Split(scanner.Text(), "\t")
		// Append the first field to the list of names
		names = append(names, fields[0])
		// Split the second field on the space character
		if len(fields) >= 2 {
			exclusions[fields[0]] = fields[1]
		} else {
			exclusions[fields[0]] = ""
		}
	}

	// Initialize the random number generator
	rand.Seed(time.Now().UnixNano())

	// Shuffle the names
	for i := range names {
		// Pick a random index that is not on the exclusion list
		j := i
		for {
			j = rand.Intn(len(names))
			if !strings.Contains(exclusions[names[i]], names[j]) {
				break
			}
		}
		names[i], names[j] = names[j], names[i]
	}

	// Print the name pairs
	for i := 0; i < len(names)-1; i++ {
		fmt.Printf("%s gives a gift to %s\n", names[i], names[i+1])
	}
	// The last person gives a gift to the first person
	fmt.Printf("%s gives a gift to %s\n", names[len(names)-1], names[0])
}
```
- I manually put the *if len(fields) >= 2* because I wanted this column to be optional.
- `!strings.Contains(exclusions[names[i]], names[j])` technically it works ... even if I was expected something like a slice but if the names are 
white spaces separated then yes why not it's simpler.

## Some Github actions too

Our program is ready and need a Github action to create the release and build binaries for Windows, Linux and MacOS.

![Image](articles/images/article11_6.jpg 'Image')

```yaml
name: Release Golang program

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Go
        uses: actions/setup-go@v2
        with:
          go-version: ^1.15
          architecture: amd64
      - name: Build Go program
        run: |
          go build -o secret-santa
          tar -czvf secret-santa_windows_amd64.tar.gz secret-santa
          rm secret-santa
          GOOS=linux GOARCH=amd64 go build -o secret-santa
          tar -czvf secret-santa_linux_amd64.tar.gz secret-santa
          rm secret-santa
          GOOS=darwin GOARCH=amd64 go build -o secret-santa
          tar -czvf secret-santa_macos_amd64.tar.gz secret-santa
      - name: Upload release assets
        uses: actions/upload-release-asset@v1
        with:
          upload_url: ${{ github.event.release.upload_url }}
          asset_path: secret-santa_{{ linux, windows, macos }}_amd64.tar.gz
          asset_name: secret-santa_{{ linux, windows, macos }}_amd64.tar.gz
          asset_content_type: application/gzip
```
Alright ... I have some doubts about this github action ... but at least I have the root structure of it that will probably be adapted.

*Note: I had to change a lot of things in here to make it work*

# Conclusion

**ChatGPT** is amazing ... didn't expect to have a tools where I can literally *speak* with and understand what I would like it to do.

It will be a complement of stack-overflow and probably better because this capability the create something that doesn't exist yet from reading the doc (**ChatGPT** gives the references of documentation + comments in the responses) makes this tools like the **Jarvis** of Iron-Man in real-life.

We have also seen that what's generated isn't perfect and the lack of robustness and validation (or maybe I put to much of those in my code) need to be addressed when reviewing the response.
