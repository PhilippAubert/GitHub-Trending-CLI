import axios from "axios";
import type { OptionValues } from "commander";

import type { Repo, SearchResponse } from "./types.js";

import {  durationToDate, formatDate } from "./dateHelper.js";
import { languageQuery } from "./languageHelper.js";


export const getData = async (args: OptionValues | null): Promise<Repo[]|null> => {
    const sinceDate = durationToDate(args?.["duration"]);
    const query = sinceDate ? 
        `${languageQuery} ${sinceDate}` : 
        languageQuery;
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
                    per_page: args?.["limit"] ? Number(args?.["limit"]) : 10,
                    page: 1
                }
            }
        );
        return data.items;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.error(e,
                `GitHub API error ${e.response?.status}: ${e.response?.data.message}`
            );
        }
        return null;
    }
};

export const parseData = async (repos: Repo[]): Promise<Repo[]> => {
    return repos?.map((repo) => ({
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
        created_at: formatDate(repo.created_at)
    }));
};