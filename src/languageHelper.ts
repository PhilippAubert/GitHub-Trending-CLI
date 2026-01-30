export const languages = ["Rust", "JavaScript", "TypeScript", "PHP", "Python", "C", "C++", "C#", "Shell", "Cobol"];

export const query = [
    "stars:>1000",
    `${languages.map(l => `language:${l}`).join(" ")}`
].join(" ");