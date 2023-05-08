import React, { useEffect, useState } from 'react'
import './student-info.styles.scss'
import { useForm, Controller } from 'react-hook-form'
import Switch from '@mui/material/Switch'

function StudentInfo(props) {
  const { control, register, handleSubmit, setValue } = useForm()
  const onUpdate = (data) => console.log(data)
  const [student, setStudent] = useState(props)

  const {
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
  console.log(student)
  const [post, setPost] = useState(() => {
    return postbaccalaureate == 'Yes'
  })
  const [withdraw, setWithdraw] = useState(() => {
    return withdrawing == 'Yes'
  })
  const vet = veterans_benefits == 'Yes'

  return (
    <form onSubmit={handleSubmit(onUpdate)}>
      <label>First Name</label>
      <input
        type="text"
        {...register('first')}
        defaultValue={props.student.first}
      />{' '}
      <br />
      <p>Student Name{first}</p>
      <label>Last Name</label>
      <input {...register('last')} defaultValue={last} />
      <br />
      <label>CWU ID</label>
      <input {...register('cwu_id')} defaultValue={cwu_id} />
      <br />
      <label>CWU Email</label>
      <input type="text" {...register('email')} defaultValue={email} />
      <br />
      <label>Address</label>
      <input type="text" {...register('address')} defaultValue={address} />
      <br />
      <label>Phone</label>
      <input type="text" {...register('phone')} defaultValue={phone} />
      <br />
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
      <br />
      <label>Withdrawing</label>
      <Controller
        control={control}
        name="withdrawing"
        defaultValue={withdraw}
        render={({ value: valueProp, onChange }) => {
          return (
            <Switch
              value={valueProp}
              onChange={(event, val) => {
                setValue('withdrawing', val)
              }}
              defaultChecked={withdraw}
            />
          )
        }}
      />
      <br />
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
      <input type="submit" />
    </form>
  )
}

export default StudentInfo
