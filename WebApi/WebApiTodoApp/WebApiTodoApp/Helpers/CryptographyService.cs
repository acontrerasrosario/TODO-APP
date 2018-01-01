using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace WebApiTodoApp.Helpers
{
    public class CryptographyService
    {
        private const string hash = "#$FREFJRPNVEDCWIPDN:eon43io4ube3o4fhc92hdo";

        public static string EncryptValue(string value)
        {
            byte[] data = UTF8Encoding.UTF8.GetBytes(value);

            using (MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider())
            {
                byte[] keys = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(hash));
                using (TripleDESCryptoServiceProvider tripDES = new TripleDESCryptoServiceProvider() { Key= keys,Mode = CipherMode.ECB,Padding=PaddingMode.PKCS7 })
                {
                    ICryptoTransform transform = tripDES.CreateEncryptor();
                    byte[] results = transform.TransformFinalBlock(data, 0, data.Length);
                    return Convert.ToBase64String(results, 0, results.Length);
                }
            }

        }

        public static string DecryptValue(string value)
        {
            byte[] data = Convert.FromBase64String(value);

            using (MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider())
            {
                byte[] keys = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(hash));
                using (TripleDESCryptoServiceProvider tripDES = new TripleDESCryptoServiceProvider() { Key = keys, Mode = CipherMode.ECB, Padding = PaddingMode.PKCS7 })
                {
                    ICryptoTransform transform = tripDES.CreateDecryptor();
                    byte[] results = transform.TransformFinalBlock(data, 0, data.Length);
                    return UTF8Encoding.UTF8.GetString(results);
                }
            }

        }
    }
}