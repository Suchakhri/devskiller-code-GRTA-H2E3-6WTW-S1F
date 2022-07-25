import mysql from "serverless-mysql";
const db = mysql({
  config: {
    host:
      process.env.db_host ||
      "aws-vercel.cbyrumhoz69l.us-west-1.rds.amazonaws.com",
    port: process.env.db_port || "3306",
    database: process.env.db_database || "vercel_aws",
    user: process.env.db_user || "root",
    password: process.env.db_password || "Manutsa_003028",
  },
});
export default async function excuteQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}
