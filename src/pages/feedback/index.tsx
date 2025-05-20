import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Main from "../../main-layouts/main";
import DataTable from "../../components/Datatables";
import { columns as VF04, defaultColumns } from "../../column-def/VF04";
import ModalDetailBilling from "@/components/modal/modalDetailBilling";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  problem: yup.string().required("Problem wajib diisi"),
  rootCaused: yup.string().required("Root Caused wajib diisi"),
  correctiveAction: yup.string().required("Corrective Action wajib diisi"),
  preventiveAction: yup.string().required("Preventive Action wajib diisi"),
});

export default function Feedback() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // setLoading(true);

    console.log(data);
  };

  return (
    <Main>
      <div className="p-6 shadow-md shadow-gray-300 rounded-lg dark:border-gray-300 dark:bg-[#111217] dark:text-white border-gray-300 bg-white text-black mb-2">
        <h2 className="text-xl font-bold dark:text-gray-800 mb-4">FEEDBACK</h2>

        <hr className="border-t border-gray-300 dark:border-gray-600 mb-4" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body flex flex-col gap-5 p-5"
        >
          <div className="flex flex-col gap-1">
            <label className="form-label font-normal text-gray-900">
              Problem
            </label>
            <Controller
              name="problem"
              control={control}
              render={({ field }) => (
                // <input
                //   {...field}
                //   className={`input ${errors.problem ? "border-red-500" : ""}`}
                //   type="text"
                //   placeholder="problem"
                //   />
                <textarea
                  {...field}
                  className={`textarea ${
                    errors.problem ? "border-red-500" : ""
                  }`}
                  placeholder="Problem"
                  rows={6}
                ></textarea>
              )}
            />
            {errors.problem && (
              <p className="text-red-500 text-sm">{errors.problem.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="form-label font-normal text-gray-900">
              Root Caused
            </label>
            <Controller
              name="rootCaused"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className={`textarea ${
                    errors.rootCaused ? "border-red-500" : ""
                  }`}
                  placeholder="Root Caused"
                  rows={6}
                ></textarea>
              )}
            />
            {errors.rootCaused && (
              <p className="text-red-500 text-sm">
                {errors.rootCaused.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="form-label font-normal text-gray-900">
              Corrective Action
            </label>
            <Controller
              name="correctiveAction"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className={`textarea ${
                    errors.correctiveAction ? "border-red-500" : ""
                  }`}
                  placeholder="Corrective Action"
                  rows={6}
                ></textarea>
              )}
            />
            {errors.correctiveAction && (
              <p className="text-red-500 text-sm">
                {errors.correctiveAction.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="form-label font-normal text-gray-900">
              Preventive Action
            </label>
            <Controller
              name="preventiveAction"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className={`textarea ${
                    errors.preventiveAction ? "border-red-500" : ""
                  }`}
                  placeholder="Preventive Action"
                  rows={6}
                ></textarea>
              )}
            />
            {errors.preventiveAction && (
              <p className="text-red-500 text-sm">
                {errors.preventiveAction.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary flex justify-center grow"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </>
            ) : (
              "Submit"
            )}
          </button>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>
      </div>
    </Main>
  );
}
