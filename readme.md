# 🎄 Advent of Code

This repo holds my solutions for Advent of Code. I have done 2015, part of 2021 and 2022. I only upload the code that got me the solution. This means there is no rewriting anything to make it more clean after that.

## 🛠 How to use
To use this template, first download it and install the dependency:
```bash
 $ git clone --single-branch --branch template https://github.com/MauritsWilke/AdventOfCode.git

 # Not required but adviced:

 $ git branch -m main

 $ npm i
```

Open it in any editor ([Visual Studio Code](https://code.visualstudio.com/) recommended) and add a folder for the day you want to solve under its year (`2015/04`). Copy the files from [`template`](./template/) into the folder.

To run your solutions, make sure you compile first (`npx tsc`) and then run `node .` which will start the CLI (or pass arguments to skip the CLI: `node . 2022 02 1`).

If you have any questions on how to use the template, feel free to DM me on Discord: [`The Almighty One#3365`](https://discordapp.com/users/378874450105466880/)

## Days I want to improve later
These are days with solutions I am ashamed of and want to improve on later 😅
 - [ ] [`/2015/15`](./src/2015/15/)


## Advent of Code - Stuck checklist
- [ ] Check your input data, copy and paste it again.
- [ ] Check your hardcoded values, delete them and retype them.
- [ ] If you have a grid, check if the X and Y are correct in _all_ cases
- [ ] Check if you're not programming in `template/partX.ts` 😓
