using BibliotecaIrt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BibliotecaIrt.Controllers
{
    public class ReservaController : Controller
    {
        // GET: Reserva
        public ActionResult Index(string msg)
        {
            ViewBag.Msg = msg;
            return View("Index", ReservaModel.ObterRegistro(0));
        }

        public ActionResult Editar(int id, string msg = "", bool permissaoEditar = false)
        {
            ViewBag.Livros = new SelectList(LivroModel.Lista(), "idLivro", "nomeLivro");
            ViewBag.Msg = msg;
            ViewBag.PermissaoEditar = permissaoEditar;
            return View("Detalhe", ReservaModel.ObterRegistro(id));
        }

        public ActionResult Novo()
        {
            return Editar(0, "", true);
        }

        public ActionResult Salvar(ReservaModel obj)
        {
            try
            {
                if (ReservaModel.Salvar(obj))
                {
                    return Index("Registro salvo com sucesso.");
                }
                else
                {
                    return Index("O registro nao foi salvo.");
                }
            }
            catch (Exception ex)
            {
                return Editar(obj.idReserva, ex.Message);
            }
        }

        public ActionResult Deletar(int id)
        {
            if (ReservaModel.Deletar(id))
            {
                return Index("Registro salvo com sucesso");
            }
            else
            {
                return Index("O registro nao foi excluido.");
            }
        }

    }
}