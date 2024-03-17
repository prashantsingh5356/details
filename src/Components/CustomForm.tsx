import { useForm } from "react-hook-form";
import { Select } from "chakra-react-select";
import { useRef } from "react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

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
  { value: "other", label: "Other" },
];

function CustomForm() {
  // const techList = defaultValue.map((val) => <input value={val.tech} />);

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
      techStack: "",
      techList: [],
    },
  });

  watch("techList");
  // watch("gender")
  console.log("gender", getValues("gender"), errors);

  const removeTechStack = (val: string) => {
    let modifiedList = getValues("techList").filter(
      (techStack: string) => techStack != val
    );
    setValue("techList", modifiedList);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <h1 className="title">Basic Details</h1>
      <div className="form-container">
        <div className="form-Basic-details">
          <div className="form-element">
            <label>First Name</label>
            <input
              placeholder="First Name"
              {...register("firstName", {
                required: true,
                pattern:
                  /^[a-zA-Z]+(?:-[a-zA-Z]+)*(?: [a-zA-Z]+(?:-[a-zA-Z]+)*)*$/,
              })}
            />
            {errors?.firstName?.type && (
              <p>
                {errors?.firstName?.type == "required"
                  ? "Name is required"
                  : "Name is incorrect"}
              </p>
            )}
          </div>
          <div className="form-element">
            <label>Last Name</label>
            <input
              placeholder="Last Name"
              {...register("lastName", {
                required: true,
                pattern:
                  /^[a-zA-Z]+(?:-[a-zA-Z]+)*(?: [a-zA-Z]+(?:-[a-zA-Z]+)*)*$/,
              })}
            />
            {errors?.lastName?.type && (
              <p>
                {errors?.lastName?.type == "required"
                  ? "Name is required"
                  : "Name is incorrect"}
              </p>
            )}
          </div>
        </div>
        <h1 className="title">Other Information</h1>
        <div className="form-other-details">
          <div className="form-element">
            <label>Gender</label>
            <Select
              className="genderSelect"
              // name="Gender"
              options={defaultOptions}
              placeholder="Gender"
              closeMenuOnSelect={false}
              size="lg"
              {...register("gender", {
                required: true,
                onChange: (e) => console.log("g", e),
              })}
            />
            {errors?.gender?.type == "required" && <p>Gender is required</p>}
          </div>
          <div className="form-element">
            <label>Date of Birth</label>
            <input
              type="date"
              placeholder="Date"
              {...register("dateOfBirth", { required: true })}
            />
            {errors?.dateOfBirth?.type == "required" && <p>DOB is required</p>}
          </div>
        </div>
        <div className="form-tech-stack">
          <div>
            <div className="tech-stack_header">
              <label>Tech Stack</label>
              <AddIcon
                boxSize={4}
                onClick={() => {
                  if (getValues("techStack")?.length == 0) {
                    return;
                  }
                  setValue("techList", [
                    ...getValues("techList"),
                    getValues("techStack"),
                  ]);
                  setValue("techStack", "");
                }}
              />
            </div>
            <input
              type="text"
              placeholder="Enter tech stack"
              {...register("techStack", {
                required: true,
                pattern: /^[a-zA-Z0-9_-]+(?:,[a-zA-Z0-9_-]+)*$/,
              })}
            />
            {errors?.techStack?.type && getValues("techList").length == 0 && (
              <p>
                {errors?.techStack?.type == "required"
                  ? "Tech Stack is required"
                  : "Invalid Tech Stack"}
              </p>
            )}
          </div>
          <div className="form-tech-list">
            {getValues("techList").map((val, i) => (
              <div className="tech-stack_list" key={i}>
                <h2>{val}</h2>
                <CloseIcon
                  color={"black"}
                  onClick={() => removeTechStack(val)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-end",
        }}
      >
        <input type="submit" value="Submit" className="submit-btn" />
      </div>
    </form>
  );
}

export default CustomForm;
