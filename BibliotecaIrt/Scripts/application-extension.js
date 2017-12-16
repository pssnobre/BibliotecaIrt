/* utils functions */

function GetDateFromJson(obj) {
    var date = new Date(parseInt(obj.substr(6)));
    return date.toISOString().substr(0, 10).split('-').reverse().join('/');
}

function attrDefault($el, data_var, default_val) {
    if (typeof $el.attr(data_var) != 'undefined') {
        return $el.attr(data_var);
    }

    return default_val;
}

String.prototype.replaceAll = function (replace, to) {
    return this.split(replace).join(to);
}

/*! jquery.mask extension end */

$(document).ready(function () {

    if ($.isFunction($.fn.datepicker)) {
        $(".datepicker-single").datepicker({ language: "pt-BR" });
        $(".datepicker-range").datepicker({ range: true, multipleDatesSeparator: " - ", language: "pt-BR" });
        $(".datepicker-timer").datepicker({ timepicker: true, dateTimeSeparator: ' ', language: "pt-BR" });
    }
    // Datatable Paginate

    if ($.isFunction($.fn.dataTable)) {
        var opt = {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar",
            "oPaginate": {
                "sNext": "»",
                "sPrevious": "«",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        }

        $('table.pagination-10').each(function () {
            if (!$.fn.DataTable.isDataTable(this)) {
                $(this).dataTable({
                    bFilter: false, bInfo: false, pageLength: 10, bSort: false, searching: false, bLengthChange: false, stateSave: true, language: opt,
                    "fnInitComplete": function () {
                        $(this).show();
                    }
                });
            }
        });

        $('table.pagination-5').each(function () {
            if (!$.fn.DataTable.isDataTable(this)) {
                $(this).dataTable({
                    bFilter: false, bInfo: false, pageLength: 5, bSort: false, searching: false, bLengthChange: false, language: opt,
                    "fnInitComplete": function () {
                        $(this).show();
                    }
                });
            }
        });

        $(".dataTables_paginate").each(function () {
            if ($(this).find("span a").length == 1) {
                $(this).addClass("hidden");
            }
        });
    }


    // Meio Mask
    if ($.isFunction($.fn.setMask)) {

        $(".mask-telefone").each(function (i, el) {
            telefonemask(el)
            $(el).keyup(function () {
                telefonemask(el)
            });
        });

        function telefonemask(el) {
            if ($(el).val().length > 14) {
                $(el).setMask("(99) 99999-9999");
            }
            else {
                $(el).setMask("(99) 9999-99999");
            }
        }

        $(".mask-currency").each(function (i, el) {
            $(el).maskMoney({ prefix: 'R$ ', allowNegative: false, thousands: '.', decimal: ',', affixesStay: true });
            $(el).maskMoney('mask')
        });

        $(".mask-cpf").each(function (i, el) {
            $(el).setMask("999.999.999-99");
        });

        $(".mask-data").each(function (i, el) {
            $(el).setMask("99/99/9999");
        });

        $(".mask-cep").each(function (i, el) {
            $(el).setMask("99999-999");
        });

        $(".mask-number").each(function (i, el) {
            var maxlength = $(this).attr("maxlength");
            var mask = "";
            if (typeof (maxlength) == "undefined") {
                mask = "99999999999999999";
            }
            else {
                for (var i = 0; i < maxlength; i++) {
                    mask += "9";
                }
            }
            $(el).setMask(mask);
        });

        $(".mask-cnpj").each(function (i, el) {
            $(el).setMask("99.999.999/9999-99");
        });

        $(".mask-cpfcnpj").each(function (i, el) {
            cpfcnpjmask(el)
            $(el).keyup(function () {
                cpfcnpjmask(el)
            });
        });

        $(".decimal").each(function (i, el) {
            $(el).setMask("999.999.999.999,99");
        });

        $(".mask-timer").each(function (i, el) {
            $(el).setMask("99/99/9999 99:99");
        });

        


        function cpfcnpjmask(el) {
            if ($(el).val().length > 14) {
                $(el).setMask("99.999.999/9999-99");
            }
            else {
                $(el).setMask("999.999.999-999");
            }
        }
    }
});

/*! jquery.mask extension end */



/*! jquery.validate extension begin */
$(document).ready(function () {
    if (jQuery.validator != undefined) {
        jQuery.extend(jQuery.validator.messages, {
            required: "Campo de preenchimento obrigat&oacute;rio.",
            remote: "Por favor, corrija este campo.",
            email: "Formato de E-mail inv&aacute;lido!",
            url: "Por favor, introduza um URL v&aacute;lido.",
            date: "Por favor, introduza uma data v&aacute;lida.",
            dateISO: "Por favor, introduza uma data v&aacute;lida (ISO).",
            number: "Por favor, introduza um n&uacute;mero v&aacute;lido.",
            digits: "Por favor, introduza apenas d&iacute;gitos.",
            creditcard: "Por favor, introduza um n&uacute;mero de cart&atilde;o de cr&eacute;dito v&aacute;lido.",
            equalTo: "Por favor, introduza de novo o mesmo valor.",
            accept: "Por favor, introduza um ficheiro com uma extens&atilde;o v&aacute;lida.",
            maxlength: jQuery.validator.format("Por favor, n&atilde;o introduza mais do que {0} caracteres."),
            minlength: jQuery.validator.format("Por favor, introduza pelo menos {0} caracteres."),
            rangelength: jQuery.validator.format("Por favor, introduza entre {0} e {1} caracteres."),
            range: jQuery.validator.format("Por favor, introduza um valor entre {0} e {1}."),
            max: jQuery.validator.format("Por favor, introduza um valor menor ou igual a {0}."),
            min: jQuery.validator.format("Por favor, introduza um valor maior ou igual a {0}.")
        });



        function ExtendValidation(validationsArray) {

            jQuery.validator.addMethod("cpf", function (value, element) {

                var cpf = value.replace(/[^\d]+/g, '');

                if (cpf == '') return true;
                var numeros, digitos, soma, i, resultado, digitos_iguais;
                digitos_iguais = 1;
                if (cpf.length < 11) {
                    return false;
                }
                for (i = 0; i < cpf.length - 1; i++) {
                    if (cpf.charAt(i) != cpf.charAt(i + 1)) {
                        digitos_iguais = 0;
                        break;
                    }
                }
                if (!digitos_iguais) {
                    numeros = cpf.substring(0, 9);
                    digitos = cpf.substring(9);
                    soma = 0;
                    for (i = 10; i > 1; i--) {
                        soma += numeros.charAt(10 - i) * i;
                    }
                    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                    if (resultado != digitos.charAt(0)) {
                        return false;
                    }
                    numeros = cpf.substring(0, 10);
                    soma = 0;
                    for (i = 11; i > 1; i--) {
                        soma += numeros.charAt(11 - i) * i;
                    }
                    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                    if (resultado != digitos.charAt(1)) {
                        return false;
                    }
                    return this.optional(element) || /(^$)|([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2})/.test(value);
                }
                else {
                    return false;
                }
            }, "CPF inválido!");

            jQuery.validator.addMethod("dateBR", function (value, element) {
                if (value.length == 0) {
                    return true;
                }

                if (!/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(value)) {
                    return false;
                }
                return true;
            }, "Data inválida");

            jQuery.validator.addMethod("cnpj", function (value, element) {

                var cnpj = value.replace(/[^\d]+/g, '');

                if (cnpj == '') return true;

                if (cnpj.length != 14)
                    return false;

                // Valida DVs
                tamanho = cnpj.length - 2
                numeros = cnpj.substring(0, tamanho);
                digitos = cnpj.substring(tamanho);
                soma = 0;
                pos = tamanho - 7;
                for (i = tamanho; i >= 1; i--) {
                    soma += numeros.charAt(tamanho - i) * pos--;
                    if (pos < 2)
                        pos = 9;
                }
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != digitos.charAt(0))
                    return false;

                tamanho = tamanho + 1;
                numeros = cnpj.substring(0, tamanho);
                soma = 0;
                pos = tamanho - 7;
                for (i = tamanho; i >= 1; i--) {
                    soma += numeros.charAt(tamanho - i) * pos--;
                    if (pos < 2)
                        pos = 9;
                }
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != digitos.charAt(1))
                    return false;

                return this.optional(element) || /(^$)|([0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})/.test(value);

            }, "CNPJ inválido!");


            jQuery.validator.addMethod("dateRange", function (value, element) {
                var lowerDate = $(element).val();
                var parent = $(element).parent(".dateRange-group");
                var higherDate = parent.find("input.date-to").eq(0).val();

                if (moment(lowerDate, "DD/MM/YYYY", true).isValid()) {
                    if (!moment(higherDate, "DD/MM/YYYY", true).isValid()) { return false; }
                } else {
                    if (higherDate == '' && lowerDate == '') {
                        return true;
                    }
                    return false;
                }

                if (moment(higherDate, "DD/MM/YYYY", true).isAfter(moment(lowerDate, "DD/MM/YYYY", true)) || lowerDate == higherDate) {
                    return true;
                } else {
                    return false;
                }

            }, "Intervalo de datas inválido.");

            jQuery.validator.addMethod("monthRange", function (value, element) {
                var lowerDate = $(element).val();
                var parent = $(element).parent(".monthRange-group");
                var higherDate = parent.find("input.date-to").eq(0).val();

                if (moment(lowerDate, "MM/YYYY", true).isValid()) {
                    if (!moment(higherDate, "MM/YYYY", true).isValid()) { return false; }
                } else {
                    if (higherDate == '' && lowerDate == '') {
                        return true;
                    }
                    return false;
                }

                if (moment(higherDate, "MM/YYYY", true).isAfter(moment(lowerDate, "MM/YYYY", true)) || lowerDate == higherDate) {
                    return true;
                } else {
                    return false;
                }

            }, "Intervalo de datas inválido.");

            
            jQuery.validator.addMethod('phone-validator', function (value, element) {
                value = value.replace("(", "");
                value = value.replace(")", "");
                value = value.replace("-", "");
                value = value.replace(" ", "").trim();
                if (value == '0000000000') {
                    return (this.optional(element) || false);
                } else if (value == '00000000000') {
                    return (this.optional(element) || false);
                }
                if (["00", "01", "02", "03", , "04", , "05", , "06", , "07", , "08", "09", "10"].indexOf(value.substring(0, 2)) != -1) {
                    return (this.optional(element) || false);
                }
                if (value.length < 10 || value.length > 11) {
                    return (this.optional(element) || false);
                }
                if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].indexOf(value.substring(2, 3)) == -1) {
                    return (this.optional(element) || false);
                }
                return (this.optional(element) || true);
            }, 'Informe um telefone válido');

            


            validationsArray.push("monthRange");
            validationsArray.push("cpf");
            validationsArray.push("cnpj");
            validationsArray.push("dateRange");
            validationsArray.push("dateITA");
            validationsArray.push("dateBR");
            validationsArray.push("phone-validator");


            return validationsArray;
        }

        if ($.isFunction($.fn.validate)) {
            if (typeof (ExtendValidation) != 'function') {
                ExtendValidation = function (v) {
                    return v
                }
            }
            var validationsArray = ExtendValidation(['required', 'url', 'email', 'number', 'date', 'creditcard']);

            $("form").each(function (i, el) {
                $.removeData(el, 'validator');

                var $this = $(el),
                    opts = {
                        ignore: ".ignore",
                        rules: {},
                        messages: {},
                        errorElement: 'span',
                        errorClass: 'validate-has-error',
                        highlight: function (element) {
                            $(element).addClass("validate-has-error");
                            $(element).closest('.form-group').addClass('validate-has-error');
                        },
                        unhighlight: function (element) {
                            $(element).removeClass("validate-has-error");
                            $(element).closest('.form-group').removeClass('validate-has-error');
                        },
                        errorPlacement: function (error, element) {
                            if (element.closest('.has-switch').length) {
                                error.insertAfter(element.closest('.has-switch'));
                            }
                            else
                                if (element.parent('.checkbox, .radio').length || element.parent('.input-group').length) {
                                    error.insertAfter(element.parent());
                                }
                                else {
                                    error.insertAfter(element);
                                }
                        }
                    },
                    $fields = $this.find('[validate]');


                $fields.each(function (j, el2) {
                    var $field = $(el2),
                        name = $field.attr('name'),
                        validate = attrDefault($field, 'validate', '').toString(),
                        _validate = validate.split(',');



                    for (var k in _validate) {
                        var rule = _validate[k],
                            params,
                            message;

                        if (typeof opts['rules'][name] == 'undefined') {
                            opts['rules'][name] = {};
                            opts['messages'][name] = {};
                        }

                        if ($.inArray(rule, validationsArray) != -1) {
                            opts['rules'][name][rule] = true;

                            message = $field.data('message-' + rule);

                            if (message) {
                                opts['messages'][name][rule] = message;
                            }
                        }
                            // Parameter Value (#1 parameter)
                        else
                            if (params = rule.match(/(\w+)\[(.*?)\]/i)) {
                                if ($.inArray(params[1], ['min', 'max', 'minlength', 'maxlength', 'equalTo']) != -1) {
                                    opts['rules'][name][params[1]] = params[2];


                                    message = $field.data('message-' + params[1]);

                                    if (message) {
                                        opts['messages'][name][params[1]] = message;
                                    }
                                }
                            }
                    }
                });

                $this.validate(opts);
            });
        }
    }


    $("[type='submit']").on('click', function (event) {
        var self = $(this);
        var validation = $("form").validate();
        MarkIgnoredFields(self.attr("group"));
        if (validation.checkForm() == false) {
            $("[validate].validate-has-error").removeClass("validate-has-error");
            validation.showErrors();
            event.preventDefault();
        }
    });

    function MarkIgnoredFields(ValidationGroup) {
        $(".ignore").removeClass("ignore");
        $("div.validate-has-error").removeClass("validate-has-error");

        if (ValidationGroup == undefined) {
            return;
        }

        $("[validate]").each(function () {
            if ($(this).attr("group") == undefined) { $(this).addClass("ignore"); return; }

            var Group = $(this).attr("group").split(","); // Group ->  Group[]
            if (!$.isArray(Group)) {
                Group = [Group];
            }
            if (ValidationGroup != undefined) {
                if ($.inArray(ValidationGroup, Group) == -1) // ValidationGroup != Group -> !Group.contains(ValidationGroup)
                {
                    $(this).addClass("ignore");
                }
            }
            else if (Group != undefined) {
                $(this).addClass("ignore");
            }
        });

    }

    

    //datepicker para modais
    function fixDatepickerPosition() {
        var input = $('input:focus');
        if (input.parents(".modal").length == 1) {
            var modal = $('input:focus').parents(".modal").eq(0);
            $("#datepickers-container").appendTo(modal);
            if (modal.scrollTop() > 10) {
                var val = modal.scrollTop() + input.offset().top + 50;
            }
           
            $("#datepickers-container .datepicker").css("top", val);
            //console.log("updating position: " + val);
        }
    }

    $('.modal-datepicker').datepicker({
        onShow: function () {
            fixDatepickerPosition();
        },
        language: "pt-BR"
    });

    $('#ModalAluno').scroll(function () {
        fixDatepickerPosition();
    });



    //Pega a caixa de autocomplete e deixa junto do imput referente
    $(document).on("click", ".ui-autocomplete-input", function () {
        $("#ui-id-1").appendTo($(this).parent());

    });
    

});
/*! jquery.validate extension end */

//script para legendas nos mapas
$(document).ready(function () {
    $(document).on('mousemove', function (e) {
        $('#txtestado').css({
            left: e.pageX + 12,
            top: e.pageY - 30
        });
    });
});
function showtooltip(el) {
    $("#txtestado").show();
    $("#txtestado").text($(el).attr("estado"));
}
function hidetooltip(el) {
    $("#txtestado").hide();
}


