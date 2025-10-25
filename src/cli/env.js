const parseEnv = () => {
    const entries = Object.entries(process.env)
        .filter(([key]) => key.startsWith('RSS_'));

    if (entries.length > 0) {
        const result = entries.map(([k, v]) => `${k}=${v}`).join('; ');
        console.log(result);
    }
};

parseEnv();
