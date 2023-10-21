import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import "./styles.css";
import axios from "axios";
const QReader = () => {
  const [dataArr, setDataArr] = useState([]);
  const [data, setData] = useState("");
  const [flag, setFlag] = useState(false);
  const [reload, setReload] = useState(false);
  let token = localStorage.getItem("token");

  useEffect(() => {
    displayData();
  }, [data]);

  useEffect(() => {
    getAllData();
  }, [reload]);

  const getAllData = async () => {
    try {
      const res = await axios.get(`https://qr-scanner-xb07.onrender.com/api/get`, {
        headers: {
          "X-job": token,
        },
      });
      console.log("allData", res);
      setDataArr(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const displayData = async () => {
    let showDate = new Date();

    try {
      if (data) {
        const obj = {
          content: data,
          scan_date:
            showDate.getFullYear() +
            "-" +
            showDate.getMonth() +
            "-" +
            showDate.getDate(),
        };
        // console.log("obj", obj);
        const res = await axios.post(`https://qr-scanner-xb07.onrender.com/api/add`, obj, {
          headers: {
            "X-job": token,
          },
        });
        alert(res.data.message);
        setData("");
        setReload(!reload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteQR = async (id) => {
    // console.log(id);
    try {
      // console.log("token2222",token);
      const res = await axios.delete(`https://qr-scanner-xb07.onrender.com/api/delete/${id}`, {
        headers: {
          "X-job": token,
        },
      });
      setReload(!reload);
      alert(res.data.message);
      // console.log("delete",res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!token) {
    return (
      <h1 style={{ textAlign: "center" }}>
        You Are Not Authorized please login!
      </h1>
    );
  }

  return (
    <div>
      <div className="qr-container">
        {!flag && (
          <div onClick={() => setFlag(true)} className="tap">
            Tap to Scan
          </div>
        )}

        {flag && (
          <div className="reader-container">
            <div className="close" onClick={() => setFlag(false)}>
              X
            </div>
            <QrReader
              className="qr-reader"
              onResult={(result, error) => {
                if (result) {
                  console.log("result", result);
                  setData(result.text);
                }

                if (error) {
                  console.info(error);
                }
              }}
            />
          </div>
        )}
      </div>
      <div>
        <div className="data-container">
          {dataArr &&
            dataArr.map((item, idx) => {
              return (
                <div className="item" key={idx}>
                  <p>
                    <strong>Content: </strong>
                    {item.content}
                  </p>
                  <p>
                    <strong>Scan Date: </strong>
                    {item.scan_date}
                  </p>
                  <div className="delete" onClick={() => deleteQR(item.id)}>
                    Delete
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default QReader;
