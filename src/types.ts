export type Repo = {
    full_name: string,
    description: string,
    html_url: string,
    stargazers_count: number,
    language: any
};

export type SearchResponse<T> = {
    total_count: number;
    incomplete_results: boolean;
    items: T[];
};