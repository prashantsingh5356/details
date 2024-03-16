import { useForm } from "react-hook-form";
import { Select } from "chakra-react-select";
import { useRef } from "react";

import "./CustomForm.css";

const defaultValue = [
  { tech: "Java" },
  { tech: "Python" },
  { tech: "CPP" },
  { tech: "C#" },
];

const defaultOptions = [
  { value: "male", label: "Male", color: "white" },
  { value: "female", label: "Female" },
  { value: "yourChoice", label: "Your Choice" },
];

function CustomForm() {
  const techList = defaultValue.map((val) => <input value={val.tech} />);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
    },
  });

  console.log("testString", errors); // you can watch individual input by pass the name of the input

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <h1 className="title">Basic Details</h1>
      <div className="form-container">
        <div className="form-Basic-details">
          <div>
            <label>First Name</label>
            <input
              placeholder="First Name"
              {...register("firstName", {
                required: true,
                pattern:
                  /^[a-zA-Z]+(?:-[a-zA-Z]+)*(?: [a-zA-Z]+(?:-[a-zA-Z]+)*)*$/,
              })}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              placeholder="Last Name"
              {...register("lastName", {
                required: true,
                pattern:
                  /^[a-zA-Z]+(?:-[a-zA-Z]+)*(?: [a-zA-Z]+(?:-[a-zA-Z]+)*)*$/,
              })}
            />
          </div>
        </div>
        <h1 className="title">Other Information</h1>
        <div className="form-other-details">
          <div>
            <label>Gender</label>
            <Select
              className="genderSelect"
              name="Gender"
              options={defaultOptions}
              placeholder="Gender"
              closeMenuOnSelect={false}
              size="lg"
              // value={"test"}
              onChange={(val: any) => {
                setValue("gender", val.label);
              }}
            />
          </div>
          <div>
            <label>Date of Birth</label>
            <input {...register("dateOfBirth")} />
          </div>
        </div>
        <div className="form-tech-stack">
          <div>
            <label>Tech Stack</label>
            <input {...register("techStack")} />
          </div>
          {/* <div className="form-tech-list">{techList}</div> */}
        </div>
        {errors.exampleRequired && <p>This field is required</p>}
      </div>
      <input type="submit" />
    </form>
  );
}

export default CustomForm;
