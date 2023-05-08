import React, { useState } from 'react'
import './student-info.styles.scss'
import { useForm } from 'react-hook-form'
function StudentInfo(props) {
  const { register, handleSubmit } = useForm()
  const onUpdate = (data) => console.log(data)

  const { student } = props
  const [first, setFirst] = useState(student.first)
  const [last, setLast] = useState(student.last)
  const [email, setEmail] = useState(student.email)
  const [cwu, setCWU] = useState(student.cwu_id)
  const [phone, setPhone] = useState(student.phone)
  const [address, setAddress] = useState(student.address)
  const [post, setPost] = useState(student.postbaccalaurate)
  const [vetrans, setVeterans] = useState(student.veterans_benefits)
  const [widthrawing, setWithdrawing] = useState(student.widthrawing)
  const [stem, setStem] = useState(student.non_stem_majors)

  return (
    <form onSubmit={handleSubmit(onUpdate)}>
      <label>First Name</label>
      <input type="text" {...register('first')} defaultValue={first} /> <br />
      <label>Last Name</label>
      <input {...register('last')} defaultValue={last} />
      <br />
      <label>CWU ID</label>
      <input {...register('cwu_id')} defaultValue={cwu} />
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
      <input type="submit" />
    </form>
  )
}

export default StudentInfo
