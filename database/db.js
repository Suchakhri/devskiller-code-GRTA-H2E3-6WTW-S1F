import mysql from "serverless-mysql";
const db = mysql({
  config: {
    host: process.env.db_host,
    port: process.env.db_port,
    database: process.env.db_database,
    user: process.env.db_user,
    password: process.env.db_password,
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
