"use client";
import React, { useState, useRef, useEffect } from "react";

interface FormProps {
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    degree: string;
    stID: string;
    contactNumber: string;
    faculty: string;
    batch: string;
    comments: string;
    member: string;
  }) => void;
  mainColor: string; // Accept mainColor as a prop
}

const Form: React.FC<FormProps> = ({ onSubmit, mainColor }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [stID, setStID] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [faculty, setFaculty] = useState<string>("FOC"); // Default selection
  const [batch, setBatch] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [member, setMember] = useState<string>("YES");

  // Dropdown ref for closing when clicking outside
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ firstName, lastName, email, degree, stID, contactNumber, faculty, batch, comments, member });
  };

  // Helper function to generate input classes - avoids repetition
  // Using template literals for dynamic ring color based on mainColor
  const inputClasses = `
    w-full p-2 border border-gray-300 rounded-md text-sm sm:text-base 
    shadow-sm transition duration-150 ease-in-out 
    focus:outline-none focus:ring-2 focus:ring-offset-0 
    focus:ring-[${mainColor}] focus:border-[${mainColor}] 
    placeholder-gray-400 
  `; 
  // Added placeholder styling and dynamic focus ring/border color


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-none px-4 sm:px-0">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"> {/* Adjusted gap-y */}
          {/* First Name */}
          <div className="mb-2 sm:mb-0">
            <label className="block text-sm sm:text-base font-medium mb-1" style={{ color: mainColor }}>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className={inputClasses} // Use shared classes
              placeholder="Enter first name"
            />
          </div>

          {/* Last Name */}
          <div className="mb-2 sm:mb-0">
            <label className="block text-sm sm:text-base font-medium mb-1" style={{ color: mainColor }}>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className={inputClasses} // Use shared classes
              placeholder="Enter last name"
            />
          </div>

          {/* Email */}
          <div className="mb-2 sm:mb-0">
            <label className="block text-sm sm:text-base font-medium mb-1" style={{ color: mainColor }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClasses} // Use shared classes
              placeholder="your.email@example.com"
            />
          </div>

          {/* Student ID */}
          <div className="mb-2 sm:mb-0">
            <label className="block text-sm sm:text-base font-medium mb-1" style={{ color: mainColor }}>Student ID:</label>
            <input
              type="text"
              value={stID}
              onChange={(e) => setStID(e.target.value)}
              required
              className={inputClasses} // Use shared classes
              placeholder="e.g., IT12345678"
            />
          </div>

          {/* Degree Program */}
          <div className="mb-2 sm:mb-0">
            <label className="block text-sm sm:text-base font-medium mb-1" style={{ color: mainColor }}>Degree Program:</label>
            <input
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
              className={inputClasses} // Use shared classes
              placeholder="e.g., BSc (Hons) in Information Technology"
            />
          </div>

          {/* Batch Dropdown */}
          <div className="mb-2 sm:mb-0" ref={dropdownRef}>
            <label className="block text-sm sm:text-base font-medium mb-1" style={{ color: mainColor }}>Batch:</label>
            <div className="relative">
              <button
                type="button"
                // Apply similar styling to the button for consistency
                className={` 
                  ${inputClasses} text-left flex justify-between items-center cursor-pointer
                  ${batch ? 'text-gray-900' : 'text-gray-500'} 
                `} // Use shared classes + specific button styles
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {/* Adjust text color based on selection */}
                <span className={batch ? 'text-gray-900' : 'text-gray-500'}>{batch || "Select Batch"}</span>
                <svg
                  className={`w-5 h-5 ml-2 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                  style={{ color: mainColor }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto ring-1 ring-black ring-opacity-5">
                  {["21.1", "21.2", "21.3", "22.1", "22.2", "23.1", "23.2", "24.1", "24.2", "24.3", "25.1"].map((option) => (
                    <div
                      key={option}
                      // Use mainColor for text, standard hover
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base transition duration-150 ease-in-out"
                      style={{ color: mainColor }}
                      onClick={() => {
                        setBatch(option);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Faculty */}
          <div className="mb-2 sm:mb-0">
            <label className="block text-sm sm:text-base font-medium mb-1" style={{ color: mainColor }}>Faculty:</label>
            <div className="flex flex-wrap gap-x-4 gap-y-2 items-center mt-1"> {/* Added gap & alignment */}
              {["FOC", "FOE", "FOS", "FOB"].map((option) => (
                <label key={option} className="flex items-center space-x-2 text-sm sm:text-base cursor-pointer" style={{ color: mainColor }}>
                  <input
                    type="radio"
                    name="faculty"
                    value={option}
                    checked={faculty === option}
                    onChange={(e) => setFaculty(e.target.value)}
                    // Use mainColor for the radio button's checkmark/dot
                    className="form-radio h-4 w-4 transition duration-150 ease-in-out" // Tailwind's form-radio helper
                    style={{ color: mainColor }} // Applies to the check/dot via Tailwind Forms plugin (install if needed) or fallback accent-color
                    // Fallback if @tailwindcss/forms isn't used:
                    // className="accent-current h-4 w-4" style={{ accentColor: mainColor }} 
                  />
                  <span className="select-none">{option}</span> {/* Added select-none */}
                </label>
              ))}
            </div>
          </div>

          {/* Contact Number */}
          <div className="mb-2 sm:mb-0">
            <label className="block text-sm sm:text-base font-medium mb-1" style={{ color: mainColor }}>Contact Number (WhatsApp):</label>
            <input
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
              className={inputClasses} // Use shared classes
              placeholder="e.g., 07XXXXXXXX"
            />
          </div>

          {/* Club Membership */}
          <div className="mb-2 sm:mb-0">
            <label className="block text-sm sm:text-base font-medium mb-1" style={{ color: mainColor }}>Are you a member of the club?</label>
            <div className="flex flex-wrap gap-x-4 gap-y-2 items-center mt-1"> {/* Added gap & alignment */}
              {["YES", "NO"].map((option) => (
                <label key={option} className="flex items-center space-x-2 text-sm sm:text-base cursor-pointer" style={{ color: mainColor }}>
                  <input
                    type="radio"
                    name="member"
                    value={option}
                    checked={member === option}
                    onChange={(e) => setMember(e.target.value)}
                    // Use mainColor for the radio button's checkmark/dot
                     className="form-radio h-4 w-4 transition duration-150 ease-in-out" // Tailwind's form-radio helper
                     style={{ color: mainColor }} // Applies to the check/dot via Tailwind Forms plugin (install if needed) or fallback accent-color
                    // Fallback if @tailwindcss/forms isn't used:
                    // className="accent-current h-4 w-4" style={{ accentColor: mainColor }} 
                  />
                  <span className="select-none">{option}</span> {/* Added select-none */}
                </label>
              ))}
            </div>
          </div>

          {/* Special Requests */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm sm:text-base font-medium mb-1" style={{ color: mainColor }}>Any special request or comments?</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className={`${inputClasses} min-h-24`} // Use shared classes + specific height
              placeholder="Let us know if you have any dietary restrictions, questions, etc."
              rows={4} // Suggest rows for better default height
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            // Added focus ring styles to the button
            className={`
              px-6 py-2 rounded-md font-medium text-sm sm:text-base 
              transition-all duration-200 hover:opacity-90 active:scale-95 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[${mainColor}]
            `}
            style={{ backgroundColor: mainColor, color: '#FFF' }} // Changed text to white for better contrast potential
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;