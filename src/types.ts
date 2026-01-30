export type Repo = {
    full_name: string,
    description: string,
    url: string,
    stargazers_url:string,
    languages_url: any
};

export type SearchResponse<T> = {
    total_count: number;
    incomplete_results: boolean;
    items: T[];
};