#!/usr/bin/env node

import axios from "axios";
import type { Repo, SearchResponse } from "./types.js";


const languages = ["Rust", "JavaScript", "TypeScript", "PHP", "Python", "C", "C++", "C#", "Shell", "Cobol"];

const query = [
    "stars:>1000",
    `${languages.map(l => `language:${l}`).join(" ")}`
].join(" ");


const getData = async (): Promise<Repo[]|null> => {
    try {
        const { data } = await axios.get<SearchResponse<Repo>>(
            "https://api.github.com/search/repositories",
            {
                headers: {
                    "Accept": "application/vnd.github+json",
                    "User-Agent": "github-cli-tool"
                },
                params: {
                    q:query,
                    sort: "stars",
                    order: "desc",
                    per_page: 10
                }
            }
        );
        return data.items;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.error(
                `GitHub API error ${e.response?.status}: ${e.message}`
            );
        }
        return null;
    }
};

const parseData = async (repos: Repo[] | null): Promise<Repo[] | string> => {
    if(repos === null) {
        return "No repos!";
    }
    return repos.map((repo: Repo) => ({
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        language: repo.language
    }));
};

try {
    const repos = await getData();
    const dataToReturn =  await parseData(repos);
    console.log(dataToReturn);
} catch (e:any) {
    console.log(e);
}