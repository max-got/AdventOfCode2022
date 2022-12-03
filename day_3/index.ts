import { readFileSync } from 'fs';
export const input = readFileSync('day_3/input.txt', 'utf8').trim().split(/\n/g)

interface Backpack {
    "length": number,
    "strings": Array<{ firstHalf: string, secondHalf: string, thirdHalf?: string }>
}

export const EXAMPLE_INPUT = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

export const SPLITTED_EXAMPLE_INPUT: Array<string> = EXAMPLE_INPUT.split(/\n/g)

const LOWERCASE_ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('')
const UPPERCASE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

//Here we have our backpack
//i will safe "length" as well, who knows what comes in the second task :D
let backpack = [] as Backpack[]


//Get my desired input
input.map((line) => {
    let firstHalf = line.slice(0, line.length / 2)
    let secondHalf = line.slice(line.length / 2)

    backpack.push({ length: line.length, strings: [{ firstHalf, secondHalf }] })
})

//Check for the common characters and remove possible duplicates
let commonCharacters = [] as string[]
backpack.map((item) => {
    item.strings.map(() => {
        //here are duplicates
        let common: Array<string> = item.strings[0].firstHalf.split('').filter((char) => item.strings[0].secondHalf.includes(char))
        //filters the duplicates out
        commonCharacters.push(...common.filter((char, index) => common.indexOf(char) === index))
    })
})


//Map the alphabet to the points
//little shortcut, because i know that the alphabet is in order
const MAP: Map<string, number> = new Map()
LOWERCASE_ALPHABET.map((char, index) => MAP.set(char, index + 1))
UPPERCASE_ALPHABET.map((char, index) => MAP.set(char, index + 27))

//check commonCharacters with MAP
let sum: number = 0
commonCharacters.map((char) => {
    sum += MAP.get(char) as number
})

const result1: number = sum // 7766

//--------------------------------------------------------------------
/** 
* Part 2
* now we have the find the common character in every 3 lines
*/

//wonderful, just add a "thirdHalf" to the backpack
let combined: Array<string[]> = []
for (let i = 0; i < input.length; i += 3) {
    const newLine = [input[i], input[i + 1], input[i + 2]]
    combined.push(newLine)
}

//as before, but with a thirdHalf
let backpack2 = [] as Backpack[]
combined.map((line) => {
    let firstHalf = line[0]
    let secondHalf = line[1]
    let thirdHalf = line[2]
    backpack2.push({ length: line[0].length, strings: [{ firstHalf, secondHalf, thirdHalf }] })
})

//as before, but with a thirdHalf
let commonCharacters2 = [] as string[]
backpack2.map((item) => {
    item.strings.map(() => {
        let common: Array<string> = item.strings[0].firstHalf.split('').filter((char) => item.strings[0].secondHalf.includes(char) && item.strings[0].thirdHalf!.includes(char))
        commonCharacters2.push(...common.filter((char, index) => common.indexOf(char) === index))
    })
})

//as before, but with a thirdHalf
let sum2: number = 0
commonCharacters2.map((char) => {
    sum2 += MAP.get(char) as number
})

const result2: number = sum2 // 2415