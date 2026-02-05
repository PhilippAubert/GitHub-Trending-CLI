type Duration = "day" | "week" | "month" | "year";

export const durationToDate = (duration: Duration): string | undefined => {
    const now = new Date();

    switch (duration) {
        case "day":
            now.setDate(now.getDate() - 1);
            break;
        case "week":
            now.setDate(now.getDate() - 7);
            break;
        case "month":
            now.setMonth(now.getMonth() - 1);
            break;
        case "year":
            now.setFullYear(now.getFullYear() - 1);
            break;
    }

    return `created:>${now.toISOString().split("T")[0]}`;
};

export const formatDate = (iso: string): any => {
    return new Date(iso).toISOString().split("T")[0];
};