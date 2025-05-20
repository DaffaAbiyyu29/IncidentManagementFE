import Main from "../../main-layouts/main";
import Link from "next/link";

export default function ErrorNotFound() {
  return (
    <Main>
      <div className="flex flex-col items-center justify-center h-[100%]">
        <div className="mb-10">
          <img
            alt="image"
            className="dark:hidden max-h-[160px]"
            src="/media/illustrations/19.svg"
          />
          <img
            alt="image"
            className="light:hidden max-h-[160px]"
            src="/media/illustrations/19-dark.svg"
          />
        </div>
        <span className="badge badge-danger badge-outline mb-3">
          404 Not Found
        </span>
        <h3 className="text-2.5xl font-semibold text-gray-900 text-center mb-2">
          We have lost this page
        </h3>
        <div className="text-md text-center text-gray-700 mb-10">
          The requested page is missing. Check the URL or{" "}
          <Link
            href="/"
            className="text-danger font-medium hover:text-danger-active"
          >
            Return Home
          </Link>
          .
        </div>
      </div>
    </Main>
  );
}
