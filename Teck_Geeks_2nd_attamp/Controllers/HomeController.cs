using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace Teck_Geeks_2nd_attamp.Controllers
{
    public class HomeController : Controller
    {
        string ConnectionString = ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString;
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public JsonResult InsertFields(string FirstName,string LastName,int Mobno,string Address)
        {
            try
            {
                SqlConnection con=new SqlConnection(ConnectionString);
                con.Open();
                SqlCommand cmd = new SqlCommand("insert into crudtbl(FirstName,LastName,MobileNumber,Address) values ('" + FirstName + "','" + LastName + "','" + Mobno + "','" + Address + "')",con);
                cmd.ExecuteNonQuery();
                con.Close();
                return Json("success",JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                return Json("failure", JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ViewData()
        {
            try
            {
                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();
                SqlCommand cmd = new SqlCommand("select * from crudtbl", con);
                DataTable dt = new DataTable();
                SqlDataAdapter cmd1 = new SqlDataAdapter(cmd);
                cmd1.Fill(dt);
                string html = "";

                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        string id = dt.Rows[i]["id"].ToString();
                        html += "['" + id + "','" +
                                dt.Rows[i]["FirstName"] + "','" +
                                dt.Rows[i]["LastName"] + "','" +
                                dt.Rows[i]["MobileNumber"] + "','" +
                                dt.Rows[i]["Address"] + "'," +
                                "'<a onclick=\"fnEdit(" + id + ")\"><b>Edit</b></a> ||| <a onclick=\"fnDelete(" + id + ")\"><b>Delete</b></a>'],";
                    }
                }

                con.Close();

                if (html.Length > 0)
                {
                    html = html.Substring(0, html.Length - 1); // Remove trailing comma
                }

                return Json(new { html }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("failure", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult DeleteData(string id)
        {
            try
            {
                SqlConnection con=new SqlConnection(ConnectionString);
                con.Open();
                SqlCommand cmd = new SqlCommand("delete from crudtbl where id='" + id + "'", con);
                cmd.ExecuteNonQuery();
                con.Close();
                return Json("success", JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                return Json("failure", JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult EditData(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConnectionString))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("SELECT * FROM crudtbl WHERE id = @Id", con);
                    cmd.Parameters.AddWithValue("@Id", id);

                    using (SqlDataReader rdr = cmd.ExecuteReader())
                    {
                        if (rdr.Read())
                        {
                            var data = new
                            {
                                Id = rdr["id"],
                                FirstName = rdr["FirstName"],
                                LastName = rdr["LastName"],
                                MobileNumber = rdr["MobileNumber"],
                                Address = rdr["Address"]
                            };
                            return Json(data);
                        }
                    }
                }
            }
            catch (Exception) { }

            return Json(null);
        }

        [HttpPost]
        public JsonResult UpdateData(int id, string firstname, string lastname, string mobilenumber, string address)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConnectionString))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("UPDATE crudtbl SET FirstName = @FirstName, LastName = @LastName, MobileNumber = @MobileNumber, Address = @Address WHERE Id = @Id", con);

                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.Parameters.AddWithValue("@FirstName", firstname);
                    cmd.Parameters.AddWithValue("@LastName", lastname);
                    cmd.Parameters.AddWithValue("@MobileNumber", mobilenumber);
                    cmd.Parameters.AddWithValue("@Address", address);

                    cmd.ExecuteNonQuery();
                }

                return Json("success");
            }
            catch (Exception)
            {
                return Json("failure");
            }
        }


    }
}