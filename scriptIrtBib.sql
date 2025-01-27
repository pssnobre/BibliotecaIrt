USE [irt_bib]
GO
/****** Object:  Table [dbo].[livro]    Script Date: 15/12/2017 22:26:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[livro](
	[liv_id_livro] [int] IDENTITY(1,1) NOT NULL,
	[liv_ds_isbn] [varchar](4) NOT NULL,
	[liv_ds_nome] [varchar](30) NOT NULL,
	[liv_ds_autor] [varchar](30) NOT NULL,
	[liv_dt_publicacao] [date] NOT NULL,
 CONSTRAINT [PK_livro] PRIMARY KEY CLUSTERED 
(
	[liv_id_livro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[reserva]    Script Date: 15/12/2017 22:26:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[reserva](
	[res_id_reserva] [int] IDENTITY(1,1) NOT NULL,
	[res_id_livro] [int] NOT NULL,
	[res_ds_usuario] [varchar](50) NOT NULL,
	[res_dt_entrega] [date] NOT NULL,
 CONSTRAINT [PK_reserva] PRIMARY KEY CLUSTERED 
(
	[res_id_reserva] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[livro] ON 

GO
INSERT [dbo].[livro] ([liv_id_livro], [liv_ds_isbn], [liv_ds_nome], [liv_ds_autor], [liv_dt_publicacao]) VALUES (1, N'1324', N'livro 1', N'autor 1', CAST(N'2017-12-15' AS Date))
GO
INSERT [dbo].[livro] ([liv_id_livro], [liv_ds_isbn], [liv_ds_nome], [liv_ds_autor], [liv_dt_publicacao]) VALUES (2, N'3214', N'livro 2', N'autor 2', CAST(N'2017-12-16' AS Date))
GO
INSERT [dbo].[livro] ([liv_id_livro], [liv_ds_isbn], [liv_ds_nome], [liv_ds_autor], [liv_dt_publicacao]) VALUES (3, N'1111', N'livro 3', N'autor 3', CAST(N'2017-12-15' AS Date))
GO
SET IDENTITY_INSERT [dbo].[livro] OFF
GO
SET IDENTITY_INSERT [dbo].[reserva] ON 

GO
INSERT [dbo].[reserva] ([res_id_reserva], [res_id_livro], [res_ds_usuario], [res_dt_entrega]) VALUES (1, 1, N'asdfasdf', CAST(N'2017-12-15' AS Date))
GO
INSERT [dbo].[reserva] ([res_id_reserva], [res_id_livro], [res_ds_usuario], [res_dt_entrega]) VALUES (2, 2, N'usuario 2', CAST(N'2017-12-15' AS Date))
GO
SET IDENTITY_INSERT [dbo].[reserva] OFF
GO
ALTER TABLE [dbo].[reserva]  WITH CHECK ADD  CONSTRAINT [FK_COD_LIV] FOREIGN KEY([res_id_livro])
REFERENCES [dbo].[livro] ([liv_id_livro])
GO
ALTER TABLE [dbo].[reserva] CHECK CONSTRAINT [FK_COD_LIV]
GO
