import excuteQuery from "@/database/db";
export default async function handler(req, res) {
  const result = await excuteQuery({
    query: "SELECT * FROM vercel_aws.ContactsData order by name",
  });
  res.status(200).json(result);
}
