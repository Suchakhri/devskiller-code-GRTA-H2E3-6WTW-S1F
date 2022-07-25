import React from "react";

export default function EditableRow({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) {
  return (
    <tr key={editFormData.id} className="bg-white border-b  hover:bg-gray-50 ">
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {editFormData.id}
      </td>
      <td className="px-6 py-4 ">
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="px-6 py-4 ">
        <input
          type="text"
          required="required"
          placeholder="Enter a phone number..."
          name="phone"
          value={editFormData.phone}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="px-6 py-4 ">
        <input
          type="text"
          required="required"
          placeholder="Enter an address..."
          name="addressLines"
          value={editFormData.addressLines.replace(/[\[\]'""]+/g, "")}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button
          type="submit"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
        >
          Save
        </button>
        <button
          type="button"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
}
