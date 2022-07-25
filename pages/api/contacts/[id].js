import excuteQuery from "@/database/db";
import { query } from "express";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let sql_cmd_str = `SELECT * FROM vercel_aws.ContactsData WHERE id like '${req.query.id}%' OR name like '${req.query.id}%'  order by name limit 5`;
      console.log(sql_cmd_str);
      const results = await excuteQuery({
        query: sql_cmd_str,
      });
      console.log(query);
      if (results.length !== 0) {
        return res.status(200).json(results);
      } else {
        return res.status(404).json(results);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  } else if (req.method === "DELETE") {
    try {
      const results = await excuteQuery({
        query: `DELETE FROM vercel_aws.ContactsData WHERE id=(?)`,
        values: [req.query.id],
      });

      if (results.affectedRows === 1) {
        return res.status(204).end();
      } else {
        return res.status(404).send();
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  } else if (req.method === "POST") {
    const details = JSON.parse(req.body);
    try {
      const results = await excuteQuery({
        query: `INSERT INTO vercel_aws.ContactsData (id, name, phone, addressLines) VALUES(?, ?, ?, ?);      `,
        values: [details.id, details.name, details.phone, details.addressLines],
      });
      if (results.affectedRows === 1) {
        console.log("Add Contact Success!!!");
        return res.status(204).end();
      } else {
        return res.status(404).send();
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  } else if (req.method === "PATCH") {
    const details = JSON.parse(req.body);
    try {
      const results = await excuteQuery({
        query: `UPDATE vercel_aws.ContactsData SET name=?, phone=?, addressLines=? WHERE id = ?;`,
        values: [details.name, details.phone, details.addressLines, details.id],
      });
      if (results.affectedRows === 1) {
        return res.status(204).end();
      } else {
        return res.status(404).send();
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  }
}
