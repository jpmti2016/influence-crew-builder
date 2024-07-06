"use client";
import { getJWTToken } from "../actions";
import { useFormState, useFormStatus } from "react-dom";

const ErrorMessages = ({ error }) => {
  return <div className="text-red-600 peer">{error}</div>;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="p-2 text-lg bg-slate-300 text-slate-900 disabled:cursor-not-allowed disabled:bg-red-200 disabled:text-slate-600"
    >
      {pending ? "Getting token" : "Get Token"}
    </button>
  );
}

export default function GetTokenForm() {
  const [state, formAction] = useFormState(getJWTToken, null);

  return (
    <div className="p-4 bg-slate-200">
      <form className="flex flex-col gap-4" action={formAction}>
        <p aria-live="polite" className="sr-only">
          {state?.message}
        </p>
        <input name="api_url" />
        <ErrorMessages error={state?.error?.api_url?._errors[0]} />
        <SubmitButton />
      </form>

      <pre className="p-4 bg-slate-200">{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
