var WSC = false;
$(document).ready(function() {
	$.ajax({
		url:'/wholesale-products/',
		success: function(data) {
  			WSC = true;
  
			if (WSC == true) {
				wholesaleMe(); 
			}
 
		}, statusCode: {
			403: function() {
				WSC = false;
			}
	 
		}
	
	});   

	$('.modalPage').click(function() {
		$.iModal({
			type: 'ajax',
			url: $(this).attr('href'), 
			title: $(this).attr('title'),  
			width: 620,
			height: 300, 
			onShow: function() {
				//$('body').removeClass('modalClose');
			},
			onClose: function() {
				$('#ModalContainer').remove();	
			}
		});
		return false;
	});
	payJs();
});
$(document).ajaxComplete(function() {
 payJs();
});

function wholesaleMe() {
	console.log('Wholesale Customer');
	$('body').addClass('WholesaleCustomer');
	$('.shipInfo').attr('href', '/wholesale-shipping-information/');


};
function payJs() {
	
	
	if($('textarea[name=ordercomments]').size() != 0) { 
	
		var rushOrder = $('.WholesaleRushDelivery label').attr('title')+' | ';
		var signReq = $('.SignReqArea label').attr('title')+' | ';

		$('#OrderConfirmationForm').submit(function() {
			$('textarea[name=ordercomments]').val($('textarea[name=ordercomments]').val().replace(rushOrder, ''));
			$('textarea[name=ordercomments]').val($('textarea[name=ordercomments]').val().replace(signReq, '')); 
			if ($('.RushDelivery').is(':checked')) {
				$('textarea[name=ordercomments]').val(rushOrder+$('textarea[name=ordercomments]').val());
			} else {
				$('textarea[name=ordercomments]').val($('textarea[name=ordercomments]').val().replace(rushOrder, ''));
			}
			if ($('.SignReq').is(':checked')) {
				$('textarea[name=ordercomments]').val(signReq+$('textarea[name=ordercomments]').val());
			} else {
				$('textarea[name=ordercomments]').val($('textarea[name=ordercomments]').val().replace(signReq, ''));
			}
			return ExpressCheckout.ConfirmPaymentProvider();
			return false;
		});
	}

}



