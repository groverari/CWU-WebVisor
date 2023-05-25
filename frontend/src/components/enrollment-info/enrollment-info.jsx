import React, { useEffect, useState } from "react";
import "./enrollment-info.styles.scss";
import { useForm, Controller } from "react-hook-form";
import Switch from "@mui/material/Switch";
import axios from "axios";
import ConfPopUp from "../PopUp/confirmation/confPopUp";
