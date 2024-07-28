export default function ConfigurationPage() {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Frequently Asked questions</h1>
        <p className="mb-4">Configuring our project is easy. Here are the main steps:</p>
        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Troubleshooting and FAQs</h2>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>
              <strong>Q: My model isn't compatible with ONNX. What should I do?</strong>
              <p className="ml-6 mt-2">A: Not all model types are supported. Check the ONNX documentation for compatibility or consider using a supported alternative model.</p>
            </li>
            <li>
              <strong>Q: I'm getting shape mismatch errors. How can I fix this?</strong>
              <p className="ml-6 mt-2">A: Ensure that the input shape in your ONNX conversion matches the expected input of your model. Double-check the `initial_type` or `dummy_input` in your conversion code.</p>
            </li>
            <li>
              <strong>Q: The converted model gives different results than my original model. Why?</strong>
              <p className="ml-6 mt-2">A: This could be due to precision differences or unsupported operations. Try using a different opset version or check if all operations in your model are supported in ONNX.</p>
            </li>
          </ul>
        </section>
      </div>
    );
  }

