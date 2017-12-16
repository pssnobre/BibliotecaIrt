using BibliotecaIrt.Class;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BibliotecaIrt.Models
{
    public class ReservaModel
    {
        public int idReserva { get; set; }
        public int idLivro { get; set; }
        public string nomeUsuario { get; set; }
        public string nomeLivro { get; set; }
        public string dataEntrega { get; set; }
        public List<ReservaModel> listaReservas { get; set; }

        public static ReservaModel ObterRegistro(int idReserva)
        {
            irt_bibEntities db = new irt_bibEntities();
            reserva reservaObj = db.reserva.FirstOrDefault(x => x.res_id_reserva == idReserva) ?? new reserva();
            ReservaModel returnObj = PreencherObj(reservaObj);
            returnObj.listaReservas = Lista();
            return returnObj;
        }

        public static List<ReservaModel> Lista()
        {
            irt_bibEntities db = new irt_bibEntities();
            List<ReservaModel> returnObjList = new List<ReservaModel>();
            db.reserva.ToList().ForEach(x => returnObjList.Add(PreencherObj(x)));
            return returnObjList;
        }

        public static ReservaModel PreencherObj(reserva obj)
        {
            ReservaModel returnObj = new ReservaModel();
            returnObj.idLivro = obj.res_id_livro;
            returnObj.idReserva = obj.res_id_reserva;
            returnObj.nomeUsuario = obj.res_ds_usuario;
            returnObj.nomeLivro = obj.livro == null ? "" : obj.livro.liv_ds_nome;
            returnObj.dataEntrega = obj.res_dt_entrega == DateTime.MinValue ? "" : obj.res_dt_entrega.ToString().Substring(0, 10);
            

            return returnObj;
        }

        public static bool Salvar(ReservaModel obj)
        {
            irt_bibEntities db = new irt_bibEntities();
            reserva reservaObj = db.reserva.FirstOrDefault(x => x.res_id_reserva == obj.idReserva) ?? new reserva();
            reservaObj.res_id_reserva = obj.idReserva;
            reservaObj.res_id_livro = obj.idLivro;
            reservaObj.res_ds_usuario = obj.nomeUsuario;
            reservaObj.res_dt_entrega = Convert.ToDateTime(obj.dataEntrega);


            if (Convert.ToDateTime(obj.dataEntrega).Date <= DateTime.Now.Date)
            {
                throw new Exception("A data da entrega deve maior do que a data de hoje.");
            }
            if (db.reserva.Any(x => x.res_id_livro == obj.idLivro))
            {
                throw new Exception("Este livro ja foi reservado.");
            }


            if (reservaObj.res_id_reserva > 0)
            {
                db.reserva.Attach(reservaObj);
                db.Entry(reservaObj).State = EntityState.Modified;
            }
            else
            {
                db.reserva.Add(reservaObj);
            }

            bool result = db.SaveChanges() > 0;
            return result;
        }

        public static bool Deletar(int id)
        {
            irt_bibEntities db = new irt_bibEntities();
            db.reserva.Where(x => x.res_id_reserva == id).ToList().ForEach(y => db.reserva.Remove(y));
            bool result = db.SaveChanges() > 0;
            return result;
        }



    }
}