using BibliotecaIrt.Class;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BibliotecaIrt.Models
{
    public class LivroModel
    {
        public int idLivro { get; set; }
        public string isbnLivro { get; set; }
        public string nomeLivro { get; set; }
        public string nomeAutor { get; set; }
        public string dataPublicacao { get; set; }
        public string anoPublicacao { get; set; }

        public List<LivroModel> listaLivros { get; set; }

        public static LivroModel ObterRegistro(int idLivro)
        {
            irt_bibEntities db = new irt_bibEntities();
            livro livroObj = db.livro.FirstOrDefault(x => x.liv_id_livro == idLivro) ?? new livro();
            LivroModel returnObj = PreencherObj(livroObj);
            returnObj.listaLivros = Lista();
            return returnObj;
        }

        public static List<LivroModel> Lista()
        {
            irt_bibEntities db = new irt_bibEntities();
            List<LivroModel> returnObjList = new List<LivroModel>();
            db.livro.ToList().ForEach(x => returnObjList.Add(PreencherObj(x)));
            return returnObjList;
        }

        public static LivroModel PreencherObj(livro obj)
        {
            LivroModel returnObj = new LivroModel();
            returnObj.idLivro = obj.liv_id_livro;
            returnObj.isbnLivro = obj.liv_ds_isbn;
            returnObj.nomeAutor = obj.liv_ds_autor;
            returnObj.nomeLivro = obj.liv_ds_nome;
            returnObj.dataPublicacao = obj.liv_dt_publicacao == null ? "" : obj.liv_dt_publicacao.ToString().Substring(0,10);
            returnObj.anoPublicacao = obj.liv_dt_publicacao == null ? "" : ((DateTime)obj.liv_dt_publicacao).Year.ToString(); 

            return returnObj;
        }

        public static bool Salvar(LivroModel obj)
        {
            irt_bibEntities db = new irt_bibEntities();
            livro livroObj = db.livro.FirstOrDefault(x => x.liv_id_livro == obj.idLivro) ?? new livro();
            livroObj.liv_id_livro = obj.idLivro;
            livroObj.liv_ds_isbn = obj.isbnLivro;
            livroObj.liv_ds_nome = obj.nomeLivro;
            livroObj.liv_ds_autor = obj.nomeAutor;
            livroObj.liv_dt_publicacao = Convert.ToDateTime(obj.dataPublicacao);

            if (livroObj.liv_id_livro > 0)
            {
                db.livro.Attach(livroObj);
                db.Entry(livroObj).State = EntityState.Modified;
            }
            else
            {
                db.livro.Add(livroObj);
            }

            bool result = db.SaveChanges() > 0;
            return result;
        }

        public static bool Deletar(int id)
        {
            irt_bibEntities db = new irt_bibEntities();
            db.livro.Where(x => x.liv_id_livro == id).ToList().ForEach(y => db.livro.Remove(y));
            bool result = db.SaveChanges() > 0;
            return result;
        }


    }
}