import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Form } from "react-bootstrap";

function TheTable(props) {
  const [nums, setNums] = useState([]);
  const [input, setInput] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000", {
        headers: {
          Authorization: `Bearer ${props.token}`
        }
      })
      .then(res => {
        setNums(res.data.values);
        let inputArray = res.data.values;
        setInput(inputArray.map(e => (e = "")));
      })
      .catch(() => props.handleSubmit(null));
  }, [props]);
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Your input</th>
            <th>Our value</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {nums.map((num, i) => (
            <tr key={num}>
              <td>
                <Form.Control
                  className="my-2"
                  type="number"
                  placeholder="Your number"
                  onChange={e =>
                    setInput(
                      input.map((ele, index) => {
                        if (index === i) ele = e.target.value;
                        return ele;
                      })
                    )
                  }
                />
              </td>
              <td> {num} </td>
              <td>{input[i] ? (input[i] / num) * 100 : null}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TheTable;
