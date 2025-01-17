import Editor from "@monaco-editor/react";
import Selector from "./Selector";
import { useRef, useState, useEffect } from "react";
import { DEFAULT_CODE } from "../Default";
import { execute } from "./Api";
import Drawer from "../components/Drawer";
import { initSocket } from "./Socket";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
// import { getCookie } from "cookies-next";

function EditComp({ retrieve }) {
  const [users, setUsers] = useState();

  const navigator = useNavigate();

  const sockerRef = useRef(null);
  const editorRef = useRef(null);

  // const { state } = useLocation();
  // const { username, roomId } = state;
  // const cookieData = getCookie("data");
  const localData = localStorage.getItem("data");

  let username, roomId;
  localData
    ? ({ username, roomId } = JSON.parse(localData))
    : console.log("no data");

  const [code, setCode] = useState();

  useEffect(() => {
    const init = async () => {
      sockerRef.current = await initSocket();
      console.log(username, roomId, "editComp.jsx");

      sockerRef.current.on("connect_error", (err) => handle_Err(err));
      sockerRef.current.on("connect_fail", (err) => handle_Err(err));

      const handle_Err = (err) => {
        console.log(err, "error");
        navigator("/");
        toast.error("Room Not Found");
      };

      sockerRef.current.emit("join", { username, roomId });

      sockerRef.current.on(
        "joined",
        ({ allUsers, username: joinedUser, currentCode }) => {
          console.log("AllUsers", allUsers);
          console.log("Joined User", joinedUser);
          if (username !== joinedUser) {
            toast.success(`${username} joined the room`);
          }

          setUsers(allUsers);

          if (currentCode) {
            setCode(currentCode);
            console.log("Synced code on join:", currentCode);
          }
        }
      );

      sockerRef.current.on("code_update", (updatedCode) => {
        console.log(updatedCode, "Code_update");
        setCode(updatedCode); // Update local state with the new code
      });

      sockerRef.current.on("user_left", ({ socketId, username }) => {
        console.log("User Left", username);
        toast.error(`${username} left the room`);
        setUsers((prev) => prev.filter((user) => user.socketId !== socketId));
      });
    };

    init();
    return () => {
      sockerRef.current.disconnect();
      sockerRef.current.off("user_left");
      sockerRef.current.off("joined");
      sockerRef.current.off("join");
    };
  }, [username, roomId, navigator]);

  const data = useSelector((state) => state.user);
  data ? console.log(data) : console.log("no data");

  function handleEditorDidMount(editor) {
    editorRef.current = editor;

    if (code) {
      editor.setValue(code);
    }

    editor.focus();
  }

  // console.log(editorRef.current, "line23");
  const [Language, SetLanguage] = useState("javascript");

  const onSelect = (Lang) => {
    setCode(DEFAULT_CODE[Lang]);
    SetLanguage(Lang);
    sockerRef.current.emit("sync_code", {
      roomId,
      code: DEFAULT_CODE[Lang],
      Lang,
    });
  };

  const compiler = async () => {
    // console.log(Language, code);
    const response = await execute(Language, code);
    retrieve(response);
  };

  return (
    <>
      <div className="p-4 rounded-xl">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Drawer users={users}></Drawer>
        <Selector
          compiler={compiler}
          onSelect={onSelect}
          Language={Language}
        ></Selector>

        <Editor
          height="78vh"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          defaultLanguage={Language}
          value={typeof code === "string" ? code : ""}
          defaultValue="// Select language and start coding together!"
          options={{
            fontSize: 20,
          }}
          onChange={(input) => {
            if (typeof input === "string") {
              console.log(input, "line 122");
              setCode(input);
              sockerRef.current.emit("sync_code", {
                roomId,
                code: input,
                Language,
              });
            } else {
              console.error("Received invalid input from editor:", input);
            }
          }}
        />
      </div>
    </>
  );
}
EditComp.propTypes = {
  retrieve: PropTypes.func.isRequired,
};

export default EditComp;
