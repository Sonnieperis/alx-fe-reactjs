import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../lib/api";

const RegistrationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
});

export default function FormikForm() {
  return (
    <div style={{ maxWidth: 420, margin: "2rem auto", padding: "1rem", border: "1px solid #eee", borderRadius: 12 }}>
      <h2 style={{ marginBottom: "0.5rem" }}>Registration (Formik + Yup)</h2>
      <p style={{ color: "#666", marginBottom: "1rem" }}>Formik state + schema validation</p>

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={RegistrationSchema}
        onSubmit={async (values, { setSubmitting, resetForm, setStatus }) => {
          setStatus(undefined);
          try {
            const res = await registerUser(values);
            setStatus({ type: "success", message: `Registered as ${res.username || values.username}` });
            resetForm();
          } catch (err) {
            setStatus({ type: "error", message: err.message || "Registration failed" });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Form noValidate>
            {status?.message && (
              <div
                style={{
                  padding: "0.75rem",
                  borderRadius: 8,
                  marginBottom: "1rem",
                  background: status.type === "success" ? "#ecfdf5" : "#fef2f2",
                  color: status.type === "success" ? "#065f46" : "#991b1b",
                  border: `1px solid ${status.type === "success" ? "#a7f3d0" : "#fecaca"}`,
                }}
              >
                {status.message}
              </div>
            )}

            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="username" style={{ display: "block", marginBottom: 6 }}>
                Username
              </label>
              <Field
                id="username"
                name="username"
                type="text"
                placeholder="e.g. muthoni"
                style={{ width: "100%", padding: "0.6rem", borderRadius: 8, border: "1px solid #ccc" }}
              />
              <ErrorMessage name="username" component="div" style={{ color: "#b91c1c", marginTop: 6 }} />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="email" style={{ display: "block", marginBottom: 6 }}>
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="e.g. muthoni@example.com"
                style={{ width: "100%", padding: "0.6rem", borderRadius: 8, border: "1px solid #ccc" }}
              />
              <ErrorMessage name="email" component="div" style={{ color: "#b91c1c", marginTop: 6 }} />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="password" style={{ display: "block", marginBottom: 6 }}>
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="min 6 characters"
                style={{ width: "100%", padding: "0.6rem", borderRadius: 8, border: "1px solid #ccc" }}
              />
              <ErrorMessage name="password" component="div" style={{ color: "#b91c1c", marginTop: 6 }} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: 8,
                border: 0,
                background: isSubmitting ? "#93c5fd" : "#3b82f6",
                color: "white",
                cursor: "pointer",
              }}
            >
              {isSubmitting ? "Submitting…" : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
