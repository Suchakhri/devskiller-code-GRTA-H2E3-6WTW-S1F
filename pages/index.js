import React, { useState, Fragment, useEffect } from "react";
import ReadOnlyRow from "@/layouts/ReadOnlyRow";
import EditableRow from "@/layouts/EditableRow";
import { v4 as uuidv4 } from "uuid";

export default function index() {
  const [uuid, setUuid] = useState("");
  const [show, setShow] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [addFormData, setAddFormData] = useState({
    id: "",
    name: "",
    phone: "",
    addressLines: "",
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    phone: "",
    addressLines: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: uuid,
      name: addFormData.name.value,
      phone: addFormData.phone.value,
      addressLines: addFormData.addressLines.value,
    };
    setAddFormData([]);
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
    fetchdata(newContact, "POST");
    addFormData.name.value = "";
    addFormData.phone.value = "";
    addFormData.addressLines.value = "";
    setUuid(uuidv4());
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editFormData.id,
      name: editFormData.name,
      phone: editFormData.phone,
      addressLines: editFormData.addressLines,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    fetchdata(newContacts[index], "PATCH");

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
      addressLines: contact.addressLines,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    setShow(false);

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    fetchdata({ id: newContacts.splice(index, 1)[0].id }, "DELETE");

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  const fetchdata = async (contact, method) => {
    switch (method) {
      case "GET":
        try {
          let results = await fetch(
            `https://devskiller-code-grta-h2-e3-6-wtw-s1-f.vercel.app/api/contacts/${contact.id}`
          );
          const data = await results.json();
          setContacts(data);
          setShow(true);
        } catch (error) {
          return error;
        }
        break;
      case "DELETE":
        try {
          let del = await fetch(
            `https://devskiller-code-grta-h2-e3-6-wtw-s1-f.vercel.app/api/contacts/${contact.id}`,
            {
              method: method,
              headers: { "Content-Type": "text/plain" },
            }
          );
          setShow(true);
        } catch (error) {
          return error;
        }
        break;
      case "PATCH":
        try {
          let update = await fetch(
            `https://devskiller-code-grta-h2-e3-6-wtw-s1-f.vercel.app/api/contacts/${contact.id}`,
            {
              method: "PATCH",
              body: JSON.stringify({
                id: contact.id,
                name: contact.name,
                phone: contact.phone,
                addressLines: contact.addressLines,
              }),
              headers: { "Content-Type": "text/plain" },
            }
          );
        } catch (error) {
          return "Contact not found!!!";
        }
        break;
      case "POST":
        console.log(contact);
        try {
          let results = await fetch(
            `https://devskiller-code-grta-h2-e3-6-wtw-s1-f.vercel.app/api/contacts/${contact.id}`
          );
          const data = await results.json();
          console.log(data);
          if (data.length === 0) {
            let post = await fetch(`/api/contacts/${contact.id}`, {
              method: "POST",
              body: JSON.stringify({
                id: contact.id,
                name: contact.name,
                phone: contact.phone,
                addressLines: contact.addressLines,
              }),
              headers: { "Content-Type": "text/plain" },
            });
          } else {
            console.log("Something went wrong!!!");
          }
        } catch (error) {
          return "Contact not found!!!";
        }
        break;
      default:
        return "Method not found!!!";
    }
  };

  let getID;
  const handleSubmit = (event) => {
    setShow(false);
    event.preventDefault();
    const srch_ID = getID.value;
    console.log(srch_ID);
    fetchdata({ id: srch_ID }, "GET");
    getID.value = "";
  };
  const loadContacts = async () => {
    let results = await fetch(
      `https://devskiller-code-grta-h2-e3-6-wtw-s1-f.vercel.app/api/contacts`
    );
    const data = await results.json();
    setContacts(data);
  };
  useEffect(() => {
    let generate_id = uuidv4();
    loadContacts();
    setUuid(generate_id);
    // setShow(true);
  }, []);
  return (
    <div className="container mx-auto">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-4 mb-5">
          <label className="sr-only">Search</label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
              </svg>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="table-search"
                required
                ref={(input) => (getID = input)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5"
                placeholder="To show contact's details, type its ID..."
              />
            </form>
          </div>
        </div>
        <form onSubmit={handleAddFormSubmit} className="mb-[40px]">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Add a Contact
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b  hover:bg-gray-50 ">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {uuid}
                </td>
                <td className="px-6 py-4 ">
                  <input
                    type="text"
                    name="name"
                    required="required"
                    ref={(input) => (addFormData.name = input)}
                    placeholder="Enter a name..."
                    onChange={handleAddFormChange}
                  />
                </td>
                <td className="px-6 py-4 ">
                  <input
                    type="text"
                    name="phone"
                    required="required"
                    ref={(input) => (addFormData.phone = input)}
                    placeholder="Enter a phone number..."
                    onChange={handleAddFormChange}
                  />
                </td>
                <td className="px-6 py-4 ">
                  <input
                    type="text"
                    name="addressLines"
                    required="required"
                    ref={(input) => (addFormData.addressLines = input)}
                    placeholder="Enter an addres..."
                    onChange={handleAddFormChange}
                  />
                </td>
                <td className="px-6 py-4 text-left">
                  <button
                    type="submit"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        {show ? (
          <form onSubmit={handleEditFormSubmit}>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <Fragment key={contact.id}>
                    {editContactId === contact.id ? (
                      <EditableRow
                        key={editContactId}
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <ReadOnlyRow
                        key={contact.id}
                        contact={contact}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </form>
        ) : null}
      </div>
    </div>
  );
}
