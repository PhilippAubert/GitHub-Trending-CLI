
import axios from "axios";
import { query } from "./languageHelper.js";
import type { Repo, SearchResponse } from "./types.js";


export const getData = async (): Promise<Repo[]|null> => {
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
                `GitHub API error ${e.response?.status}: ${e.response?.data.message}`
            );
        }
        return null;
    }
};

export const parseData = async (repos: Repo[] | null): Promise<Repo[] | undefined> => {
    return repos?.map((repo: Repo) => ({
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        language: repo.language
    }));
};