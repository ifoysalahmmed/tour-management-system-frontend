interface EnvVars {
  VITE_BASE_URL: string;
}

const loadEnvVars = (): EnvVars => {
  const { VITE_BASE_URL } = import.meta.env;

  if (!VITE_BASE_URL) {
    throw new Error("Missing environment variable: VITE_BASE_URL");
  }

  return {
    VITE_BASE_URL,
  };
};

export const envVars = loadEnvVars();
