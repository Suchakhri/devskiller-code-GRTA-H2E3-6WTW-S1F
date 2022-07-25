import React from "react";

export default function ReadOnlyRow({
  contact,
  handleEditClick,
  handleDeleteClick,
}) {
  return (
    <tr key={contact.id} className="bg-white border-b hover:bg-gray-50 ">
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {contact.id}
      </td>
      <td className="px-6 py-4 ">{contact.name}</td>
      <td className="px-6 py-4">{contact.phone}</td>
      <td className="px-6 py-4">
        {contact.addressLines.replace(/[\[\]'""]+/g, "")}
      </td>

      <td>
        <button
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4"
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          type="button"
          onClick={() => handleDeleteClick(contact.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
