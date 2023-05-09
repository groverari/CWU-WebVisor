import React, { useEffect, useState } from 'react'
import './student-info.styles.scss'
import { useForm, Controller } from 'react-hook-form'
import Switch from '@mui/material/Switch'
import axios from 'axios'

function StudentInfo(props) {
  const { control, register, handleSubmit, setValue } = useForm()
  const api_url = import.meta.env.VITE_API_URL
  const onUpdate = (data) => {
    console.log(data)
    axios
      .post(api_url + 'student.php', {
        request: 'update_student',
        user_id: 41792238,
        id: id,
        first: data.first,
        last: data.last,
        cwu_id: data.cwu_id,
        email: data.email,
        phone: data.phone,
        address: data.address,
        postbac: data.postbac ? 'Yes' : 'No',
        withdrawing: data.withdrawing ? 'Yes' : 'No',
        veterans: data.veterans ? 'Yes' : 'No',
        active: 'Yes',
        non: data.non
      })
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const [student, setStudent] = useState(props)
  const [fname, setFname] = useState('')
  const {
    id,
    first,
    last,
    email,
    cwu_id,
    phone,
    address,
    postbaccalaureate,
    veterans_benefits,
    withdrawing,
    non_stem_majors
  } = props.student

  if (fname != first) {
    setFname(first)
  }
  const [post, setPost] = useState(() => {
    return postbaccalaureate == 'Yes'
  })
  const [withdraw, setWithdraw] = useState(() => {
    return withdrawing == 'Yes'
  })
  const vet = veterans_benefits == 'Yes'

  return (
    <form onSubmit={handleSubmit(onUpdate)}>
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          {...register('first')}
          defaultValue={props.student.first}
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input {...register('last')} defaultValue={last} />
      </div>
      <div className="form-group">
        <label>CWU ID</label>
        <input {...register('cwu_id')} defaultValue={cwu_id} />
      </div>
      <div className="form-group">
        <label>CWU Email</label>
        <input type="text" {...register('email')} defaultValue={email} />
      </div>
      <div className="form-group">
        <label>Address</label>
        <input type="text" {...register('address')} defaultValue={address} />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input type="text" {...register('phone')} defaultValue={phone} />
      </div>
      <div className="form-group">
        <label>Non-Stem</label>
        <input
          type="text"
          {...register('non')}
          defaultValue={non_stem_majors}
        />
      </div>
      <div className="form-group">
        <label>Postbaccalaurate</label>
        <Controller
          control={control}
          name="postbac"
          defaultValue={post}
          render={({ value: valueProp, onChange }) => {
            return (
              <Switch
                value={valueProp}
                onChange={(event, val) => {
                  setValue('postbac', val)
                }}
                defaultChecked={post}
              />
            )
          }}
        />
      </div>
      <div className="form-group">
        <label>Withdrawing</label>
        <Controller
          control={control}
          name="withdrawing"
          defaultValue={withdraw}
          render={({ value: valueProp, onChange }) => {
            return (
              <Switch
                defaultChecked={withdraw}
                value={valueProp}
                onChange={(event, val) => {
                  setValue('withdrawing', val)
                }}
              />
            )
          }}
        />
      </div>
      <div className="form-group">
        <label>Veteran</label>
        <Controller
          control={control}
          name="veterans"
          defaultValue={vet}
          render={({ value: valueProp, onChange }) => {
            return (
              <Switch
                value={valueProp}
                onChange={(event, val) => {
                  setValue('veterans', val)
                }}
                defaultChecked={vet}
              />
            )
          }}
        />
        <br />
      </div>
      <input type="submit" value="Update" />
    </form>
  )
}

export default StudentInfo
