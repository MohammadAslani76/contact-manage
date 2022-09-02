import * as Yup from 'yup';

export const contactSchema = Yup.object().shape({
    fullname : Yup.string("نام و نام خانوادگی معتبر نیست").required("نام و نام خانوادگی الزامی می باشد"),
    photo : Yup.string().url("آدرس معتبر نیست").required("عکس الزامی می باشد"),
    mobile : Yup.number().required("موبایل الزامی است"),
    email : Yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی می باشد"),
    job : Yup.string().nullable(),
    group : Yup.string().required("گروه الزامی می باشد")
})