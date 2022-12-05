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

Once again after having done one in scala: [secret-santa CLI in Scala](https://creativeyann17.github.io/#/article/minimal-secret-santa) let us build a secret-santa CLI but this time in **GO** and most important ... we will ask **ChatGPT** to guide us along the process.

### Do you know ?

![Image](articles/images/article11_1.jpg 'Image')

### Let's write the code

We will ask **ChatGPT** to write the code step by step.

### Base of the program

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

Executing the code works perfectly:

```
Bob gives a gift to Dave
Dave gives a gift to Eve
Eve gives a gift to Alice
Alice gives a gift to Carol
Carol gives a gift to Bob
```

### Extract the names from TSV

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

Once again executing the code work just fine, don't forget to create a *names.TSV' file.

### TSV file name as a CLI param

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
I was expected the response to use **flag** which is common for command line in **GO** but the result is OK.

### Exclusion list

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

// contains returns true if the slice contains the given value,
// and false otherwise.
func contains(slice []string, value string) bool {
	for _, v := range slice {
		if v == value {
			return true
		}
	}
	return false
}
```
I manually put the *if len(fields) >= 2* because I wanted this column to be optional.

## Some Github actions too

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

# Conclusion

I had a lot of work to do on the github action which didn't work at all first, otherwise ...

**ChatGPT** is amazing ... didn't expect to have a tools where I can literally *speak* what I would like it to do.

It will be a complement of stack-overflow for sure but also knowing that what's generated isn't perfect.

Also the documentation and comment the results contain are a great addition to the tools itself, feels like it understand what it's doing.