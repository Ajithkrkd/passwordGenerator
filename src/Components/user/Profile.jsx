import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Grid,
  Tooltip,
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { UserAuth } from "../../context/AuthContext";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import ProfileSkelton from "./ProfileSkelton";
import toast from "react-hot-toast";
import Loader from "../common/Loader";
import NoData from "../../assets/noData.svg";
const Profile = () => {
  const { user } = UserAuth();
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [tooltip, setTooltip] = useState("");
  const [passwordIdToDelete, setPasswordIdToDelete] = useState(null);
  const [open, setOpen] = React.useState(false);
  const fetchSavedPasswords = async () => {
    try {
      if (user) {
        const q = query(collection(db, "users", user.uid, "password"));
        setLoading(true);
        setFetching(true);
        const querySnapshot = await getDocs(q);

        const passwords = [];
        querySnapshot.forEach((doc) => {
          passwords.push({ id: doc.id, ...doc.data() });
        });
        console.log(passwords);
        setSavedPasswords(passwords);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchSavedPasswords();
  }, [user]);

  const handleCopyPassword = (password) => {
    navigator.clipboard.writeText(password);
    setTooltip("Password copied to clipboard");
    setTimeout(() => setTooltip(""), 2000);
  };

  const handleClickOpen = (passwordId) => {
    setPasswordIdToDelete(passwordId);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletePassword = async (e) => {
    e.preventDefault();
    console.log(passwordIdToDelete);
    if (passwordIdToDelete) {
      try {
        setFetching(true);
        await deleteDoc(
          doc(db, "users", user.uid, "password", passwordIdToDelete)
        );
        setSavedPasswords(
          savedPasswords.filter((pwd) => pwd.id !== passwordIdToDelete)
        );
        toast.success("Password deleted Successfully");
      } catch (error) {
        console.error("Error deleting password:", error);
      } finally {
        setFetching(false);
        handleClose();
      }
    }
  };

  return (
    <>
      {loading ? (
        <>
          <ProfileSkelton />
        </>
      ) : (
        <>
          {fetching && <Loader />}
          <Box
            display="flex"
            justifyContent="center"
            minHeight="100vh"
            bgcolor="#2480EA"
          >
            <Card
              sx={{ maxWidth: "100%", marginTop: 5, width: "100%", padding: 2 }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Avatar
                    alt={user?.displayName || "User Avatar"}
                    src={user?.photoURL || "/logo.png"}
                    sx={{ width: 100, height: 100 }}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {user?.displayName || "Name"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user?.email || "email@example.com"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email Verified:{" "}
                      {user?.emailVerified ? "YES" : "NO" || "N/A"}
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
              <Typography variant="h6" align="center" color="primary" component="div">
                      Saved Password
                    </Typography>

            
              {savedPasswords.length <= 0 ? (
                <>
                  <div className="flex flex-col mt-1 p-2 border items-center justify-center">
                    <img style={{width:200}} src={NoData} />
                    <p className="mt-3">No Password Saved</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-5 relative">
                    
                    {savedPasswords.map((pwd) => (
                      <div key={pwd.id}>
                        <div className="flex    border  mb-2">
                          <span className="px-2 mr-2 py-1 bg-[#4B84BE] text-white">
                            {pwd.passwordName}
                          </span>
                          <span className="text-lg text-[green]">
                            {pwd.password}
                          </span>
                          <Tooltip title="Copy!" arrow="left">
                            <span className="text-lg ml-auto mr-3">
                              <p
                                className="cursor-pointer text-xl"
                                onClick={() => {
                                  handleCopyPassword(pwd.password);
                                }}
                              >
                                <i className="bx bx-copy"></i>
                              </p>
                            </span>
                          </Tooltip>
                          <Tooltip title="Delete" arrow="left">
                            <span className="text-lg  mr-3">
                              <p
                                className="cursor-pointer text-xl"
                                onClick={() => {
                                  handleClickOpen(pwd.id);
                                }}
                              >
                                <i className="bx bx-trash"></i>
                              </p>
                            </span>
                          </Tooltip>
                        </div>
                      </div>
                    ))}
                    {tooltip && (
                      <div className="absolute top-[-30px] z-100 right-0 bg-gray-700 text-white text-xs rounded py-1 px-2">
                        {tooltip}
                      </div>
                    )}
                  </div>
                </>
              )}
            </Card>
          </Box>
        </>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete this password ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="button"
            color="error"
            onClick={(e) => {
              handleDeletePassword(e);
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
