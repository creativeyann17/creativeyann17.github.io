# Introduction

Maybe I should put some context first, why a secret santa app ? 

- First, because it's not as trivial as people may think, so there are some challenges!

- Second, in the past I made one but lose the source (shame) ... 

- Last but not least, I was in need of one that could be used to organize a real secret santa with people that won't have to sign-in to anything but only provide nicknames.

# Features
- Extract the list of participants from a CSV file.
- Manage a list of people that can't exchange gifts with each others.
- Generate all the invitation messages based on a custom template rendering, because I'm lazy to copy / paste all the results ...
- The JAR file will include a prepended script that run `java -jar` by itself (nice). It's a **SBT assembly** feature I really like.

# Technologies

- **Scala** Learned this year for my new job and wanted to do something significant with on my free time.

- **[PicoCLI](https://picocli.info/)** A really amazing library that manage all the command line stuff for you using annotations! PicoCLI also supports [GraalVM](https://www.graalvm.org/) native build, I don't use it here but maybe for a next version :)

# Conclusion

Every others details of the implementation, how to build, run and template your secret santa messages can be found in the [README](https://github.com/creativeyann17/minimal-secret-santa/blob/main/README.md).
