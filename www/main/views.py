# Create your views here.
from django.shortcuts import render_to_response
from django.template import RequestContext


def home(request):
    """Request for main page"""
    return render_to_response('index.html', {
            
        }, context_instance=RequestContext(request)
    )
