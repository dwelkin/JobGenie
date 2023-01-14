import React from "react";
import { Configuration, OpenAIApi } from "openai";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "", output: "", number: 50 };
    this.inputChange = this.inputChange.bind(this);
    this.numberChange = this.numberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  numberChange(event) {
    this.setState({ number: event.target.value });
  }

  inputChange(event) {
    this.setState({ input: event.target.value });
  }
  handleSubmit(event) {
    // console.log(process.env.REACT_APP_API_KEY);
    const configuration = new Configuration({
      apiKey: "",
    });
    const openai = new OpenAIApi(configuration);
    // console.log(this.state);
    (async () => {
      try {
        const response = await openai.createCompletion("text-curie-001", {
          prompt:
            this.state.input +
            "\nGenerate a professional resume for the above description of a person: ",
          temperature: 0.7,
          max_tokens: this.state.number * 5,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        var summarized = response.data.choices[0].text;
        while (summarized[0] === "\n") {
          summarized = summarized.substring(1);
        }
        this.setState({ output: summarized });
      } catch (e) {
        e.value = e.message;
        console.log(e.value);
      }
    })();

    event.preventDefault();
  }

  render() {
    return (
      <div class="container mx-auto">
        <div class="p-5 my-10 mx-auto max-w-4xl bg-white rounded-md shadow-sm">
          <div>
            <form onSubmit={this.handleSubmit} method="POST">
              <div class="mb-6">
                <label for="message" class="block mb-2 text-sm text-gray-600">
                  Input:
                </label>

                <textarea
                  rows="5"
                  name="input"
                  placeholder="Lorum Ipsum"
                  value={this.state.input}
                  onChange={this.inputChange}
                  class="py-2 px-3 w-full placeholder-gray-300 rounded-md border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-100 focus:outline-none"
                  required
                ></textarea>
              </div>

              <div class="float-left mb-6">
                <label
                  for="language"
                  type="select"
                  class="block mb-2 text-sm text-gray-600"
                >
                  Language
                </label>
                <select>
                  <option defaultValue value="English">
                    English
                  </option>
                  <option value="Mandarin">Mandarin</option>
                  <option value="Hindu">Hindu</option>
                </select>
              </div>

              <div class="float-left px-16 mb-6">
                <label for="number" class="block mb-2 text-sm text-gray-600">
                  Max Words:
                </label>
                <input
                  type="number"
                  value={this.state.number}
                  onChange={this.numberChange}
                />
              </div>

              <div class="mb-6">
                <button
                  type="submit"
                  class="py-4 px-2 w-full text-white bg-yellow-500 rounded-md focus:bg-yellow-600 focus:outline-none"
                >
                  Generate Resume
                </button>
              </div>

              <div class="mb-6">
                <label for="message" class="block mb-2 text-sm text-gray-600">
                  Output:
                </label>

                <textarea
                  rows="5"
                  name="output"
                  placeholder="Generate resume"
                  value={this.state.output}
                  readOnly
                  class="py-2 px-3 w-full placeholder-gray-300 rounded-md border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-100 focus:outline-none"
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
