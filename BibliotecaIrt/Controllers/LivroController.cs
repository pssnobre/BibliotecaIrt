using BibliotecaIrt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BibliotecaIrt.Controllers
{
    public class LivroController : Controller
    {
        public ActionResult Index(string msg)
        {
            ViewBag.Msg = msg;
            return View("Index", LivroModel.ObterRegistro(0));
        }

        public ActionResult Editar(int id, string msg = "", bool permissaoEditar = false)
        {
            ViewBag.Msg = msg;
            return View("Detalhe", LivroModel.ObterRegistro(id));
        }

        public ActionResult Novo()
        {
            return Editar(0, "", true);
        }

        public ActionResult Salvar(LivroModel obj)
        {
            try
            {
                if (LivroModel.Salvar(obj))
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
                return Editar(obj.idLivro, ex.Message);
            }
        }

        public ActionResult Deletar(int id)
        {
            if (LivroModel.Deletar(id))
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