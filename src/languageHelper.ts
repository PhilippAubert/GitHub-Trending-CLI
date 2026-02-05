export const languages = ["Rust", "JavaScript", "TypeScript", "PHP", "Go", "Python", "C", "C++", "C#", "Java", "Shell", "Cobol"];

export const languageQuery = [
    "stars:>1000",
    `${languages.map(l => `language:${l}`).join(" ")}`
].join(" ");

