import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import "./App.css";

const getData = () => {
  const data = localStorage.getItem("data");

  if (data !== null) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function App() {
  const [data, setData] = useState({
    fullName: "",
    number: "",
    email: "",
    textarea: "",
    age: "",
  });
  const [allRecords, setAllRecords] = useState(getData());
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isUpdate) {
      const updatedRecords = [...allRecords];
      updatedRecords[updateIndex] = {
        ...updatedRecords[updateIndex],
        fullName: data.fullName,
        number: data.number,
        email: data.email,
        textarea: data.textarea,
        age: data.age,
      };

      setAllRecords(updatedRecords);
      setIsUpdate(false);
      setUpdateIndex(null);
    } else {
      console.log();
      if(data.fullName=== "" && data.number=== "" && data.email=== "" && data.textarea=== "" && data.age=== ""  ){
        alert("Please fill the form");
      } 
      else{
        setAllRecords([
          ...allRecords,
          {
            id: uuidv4().slice(0, 4),
            fullName: data.fullName,
            number: data.number,
            email: data.email,
            textarea: data.textarea,
            age: data.age,
          },
        ]);
      }
    }

    setData({
      fullName: "",
      number: "",
      email: "",
      textarea: "",
      age: "",
    });
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = (id, index) => {
    const newData = allRecords.find((item) => item.id === id);

    setData(newData);
    setIsUpdate(true);
    setUpdateIndex(index);
  };

  const handleRemove = (id) => {
    const updatedRecords = allRecords.filter((item) => item.id !== id);
    setAllRecords(updatedRecords);
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(allRecords));
  }, [allRecords]);

  return (
    <>
      <div className="relative flex flex-col justify-center py-[30px] overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl ring-indigo-600 lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-indigo-700 uppercase decoration-wavy">
            Form
          </h1>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Enter Your Full Name
              </label>
              <input
                value={data.fullName}
                onChange={handleChange}
                name="fullName"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Enter Your Mobile Number
              </label>
              <input
                value={data.number}
                onChange={handleChange}
                name="number"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Enter Your Email Address
              </label>
              <input
                value={data.email}
                onChange={handleChange}
                name="email"
                type="email"
                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Enter Your Message
              </label>
              <textarea
                value={data.textarea}
                onChange={handleChange}
                name="textarea"
                rows={4}
                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Enter Your Age
              </label>
              <input
                value={data.age}
                onChange={handleChange}
                name="age"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-6 font-semibold text-center text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              {isUpdate ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>

      <div className="relative overflow-x-auto w-[90%] mx-auto">
        {allRecords.length >= 1 && (
          <table className="w-full text-sm  text-gray-500 dark:text-gray-400 mb-5 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Full Name</th>
                <th className="px-6 py-3">Number</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Message</th>
                <th className="px-6 py-3">Age</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white border-b text-center dark:bg-gray-800 dark:border-gray-700">
              {allRecords.map((record, index) => (
                <tr key={record.id}>
                  <td className="py-3">{record.fullName}</td>
                  <td className="py-3">{record.number}</td>
                  <td className="py-3">{record.email}</td>
                  <td className="py-3">{record.textarea}</td>
                  <td className="py-3">{record.age}</td>
                  <td className="py-3">
                    <button
                      className="focus:outline-none mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2"
                      onClick={() => handleUpdate(record.id, index)}
                    >
                      Edit
                    </button>
                    <button
                      className="focus:outline-none mr-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2"
                      onClick={() => handleRemove(record.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {allRecords.length === 0 && (
          <p className="text-center bg-white py-2">No records found.</p>
        )}
      </div>
    </>
  );
}

export default App;
