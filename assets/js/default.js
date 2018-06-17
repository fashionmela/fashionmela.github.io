// DELETE ALL ITEMS FROM AN ARRAY
                $(document).on('click', '.removeAllItems', function(){
                    sessionStorage.removeItem("scart")
                    location.reload();
                })
        
        // Shopping Cart Array
            var shopCartArray = [];
        
            $(document).ready(function(){
        // add object into arrays
                $('.productItem').click(function(){
                    var itemInfo = $(this.dataset)[0];
                    itemInfo.qty = 1;
                    itemincart = false;
                    
                    $.each(shopCartArray, function(i, val){
                        if(val.id==itemInfo.id){
                            parseInt(val.qty++);
                            itemincart = true;
                        }
                    })
                    if(!itemincart){
                        shopCartArray.push(itemInfo);
                    }
                    sessionStorage["scart"] = JSON.stringify(shopCartArray);
                    outputInfo();
                    })
                function outputInfo(){
                    if(sessionStorage["scart"]!=null){
                        shopCartArray = JSON.parse(sessionStorage["scart"].toString());
                        console.log(sessionStorage["scart"]);
                    }
                    // NULL OR DEFAULT VALUES
                    var qty = 0;
                    var subTotal = 0;
                    var total = 0;
                    var disItemInHtml = '';
                    // LOOPING HERE
                    $.each(shopCartArray, function(i, val){
                    //console.log(val)
                    // OUTPUT DEFAULT VALUES TO DYNAMIC
                    qty += parseInt(val.qty);
                    subTotal = val.qty*val.price;
                    total += subTotal;
                    disItemInHtml += `<tr>
                            <td>${val.name}</td>
                            <td>${val.qty}</td>
                            <td>${currency(subTotal)}</td>
                            <td class="btn btn-danger btn-lg btn-block text-white removeShopCartArray">Remove</td>
                            </tr>`;
                        })
                        // DISPLAY DYNAMIC VALUES
                        disItemInHtml += `<tr><td colspan="3">Total Price: </td><td class="bg-dark text-white">(${currency(total)})</td></tr>`
                        $('.finalItemsQty').html(`<div class="text--sm">Qty: <b class="pl-3 pr-3 pt-1 pb-1 text-white rounded-circle bg--orange">${qty}</b></div>`);
                        $('.finalTotal').html(`<div class="text--sm">Total: <b class="pl-3 pr-3 pt-1 pb-1 text-white rounded bg--orange">${currency(total)}</b></div>`);
                        $('.displayItem').html(disItemInHtml);
                    }
                    outputInfo();
                        function currency(n){
                        return `DKK: ${(n/1).toFixed(2)}`;
                        }
                        // REMOVE PARTICULAR ITEM
                        $('.displayItem').on('click', '.removeShopCartArray', function(){
                            shopCartArray.splice($(this),1)
                            sessionStorage["scart"] = JSON.stringify(shopCartArray);
                            outputInfo();
                        })
                    
                    })